import {Formula} from "../../common/Formula";
import {MonthlyTargetEntity} from "../entities/MonthlyTargetEntity";

export enum RateType {
  CHURN_RATE = 'CHURN_RATE',
  UPGRADE_RATE = 'UPGRADE_RATE',
  DOWNGRADE_RATE = 'DOWNGRADE_RATE'
}

export class QuarterlyAmountFormula implements Formula {
  currentQuarterTargets: MonthlyTargetEntity[] = []
  adjacentPrevMonthTarget: MonthlyTargetEntity
  rateType: RateType

  constructor(currentQuarterTargets: MonthlyTargetEntity[], adjacentPrevMonthTarget: MonthlyTargetEntity, rateType: RateType) {
    this.currentQuarterTargets = QuarterlyAmountFormula.sortTargetsByMonthAndYear(currentQuarterTargets)
    this.adjacentPrevMonthTarget = adjacentPrevMonthTarget
    this.rateType = rateType
  }

  //I think this function doesn't belong here
  private static sortTargetsByMonthAndYear(targets: MonthlyTargetEntity[]): MonthlyTargetEntity[] {
    return [...targets].sort((a, b) => {
      return (
        a.getFields().year - b.getFields().year ||
        a.getFields().month - b.getFields().month
      )
    })
  }

  calculate(): number {
    return this.currentQuarterTargets.reduce((prev, current, index) => {
      const previousMonthRecurringRevenue = this.getPreviousMonthTarget(index)?.getFields().recurringRevenue || 0
      const currentMonthRate = this.getRateTypeFromTarget(current)
      return prev + (previousMonthRecurringRevenue * currentMonthRate)
    }, 0)
  }

  private getPreviousMonthTarget(index: number): MonthlyTargetEntity {
    //Note: Need a better way to do this
    if (index === 0) return this.adjacentPrevMonthTarget
    return this.currentQuarterTargets[index - 1]
  }

  private getRateTypeFromTarget(target: MonthlyTargetEntity): number {
    if (this.rateType === RateType.CHURN_RATE) return target.getFields().churnRate
    if (this.rateType === RateType.UPGRADE_RATE) return target.getFields().upgradeRate
    if (this.rateType === RateType.DOWNGRADE_RATE) return target.getFields().downgradeRate
    return 0
  }
}