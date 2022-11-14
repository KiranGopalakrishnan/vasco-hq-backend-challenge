import {Formula} from "../../common/Formula";
import {TargetList} from "../data-structures/TargetList";
import {MonthlyTargetEntity} from "../entities/MonthlyTargetEntity";

export enum RateType {
  CHURN_RATE = 'CHURN_RATE',
  UPGRADE_RATE = 'UPGRADE_RATE',
  DOWNGRADE_RATE = 'DOWNGRADE_RATE'
}

//TODO: Refactor this to compose the calculation better
export class QuarterlyAmountFormula implements Formula {
  currentQuarterTargets: TargetList = new TargetList()
  adjacentPrevMonthTarget: MonthlyTargetEntity
  rateType: RateType

  constructor(currentQuarterTargets: TargetList, adjacentPrevMonthTarget: MonthlyTargetEntity, rateType: RateType) {
    this.currentQuarterTargets = currentQuarterTargets
    this.adjacentPrevMonthTarget = adjacentPrevMonthTarget
    this.rateType = rateType
  }

  calculate(): number {
    return this.currentQuarterTargets.getAsArray().reduce((prev, current, index) => {
      const {month, year} = current.getFields()
      const prevMonthTarget = this.getPreviousMonthTarget(index).getFields()
      const previousMonthRecurringRevenue = prevMonthTarget?.recurringRevenue || 0
      const currentMonthRate = this.getRateTypeFromTarget(current)
      return prev + (previousMonthRecurringRevenue * currentMonthRate)
    }, 0)
  }

  private getPreviousMonthTarget(index: number): MonthlyTargetEntity {
    //Note: Need a better way to do this
    if (index === 0) return this.adjacentPrevMonthTarget
    return this.currentQuarterTargets.getTargetAtIndex(index - 1)
  }

  private getRateTypeFromTarget(target: MonthlyTargetEntity): number {
    if (this.rateType === RateType.CHURN_RATE) return target.getFields().churnRate
    if (this.rateType === RateType.UPGRADE_RATE) return target.getFields().upgradeRate
    if (this.rateType === RateType.DOWNGRADE_RATE) return target.getFields().downgradeRate
    return 0
  }
}