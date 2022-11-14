import {Entity} from "../../common/Entity";
import {AcquisitionTeamMonthlyTarget} from "./AcquisitionTeamMonthlyTarget";
import {ExpansionTeamMonthlyTarget} from "./ExpansionTeamMonthlyTarget";
import {MonthlyTargetEntity, MonthlyTargetEntityExposedFields} from "./MonthlyTargetEntity";

interface ExposedFields extends MonthlyTargetEntityExposedFields {
  acquisitionTarget: number,
  expansionTarget: number
}


const PREVIOUS_YEAR = 2021
const PREVIOUS_YEAR_RECURRING_REVENUE = 100000

export class SalesTeamMonthlyTargetEntity implements Entity<ExposedFields> {
  private readonly monthlyTargets: MonthlyTargetEntity[] = []
  private readonly month: number
  private readonly year: number
  private currentMonthTarget!: MonthlyTargetEntity

  constructor(monthlyTargets: MonthlyTargetEntity[], month: number, year: number) {
    this.monthlyTargets = monthlyTargets
    this.month = month
    this.year = year
    this.setCurrentMonthTarget()
  }

  getAcquisitionTeamTarget() {
    const previousMonthTarget = this.getPreviousMonthTarget()
    return new AcquisitionTeamMonthlyTarget(this.currentMonthTarget, previousMonthTarget).getTarget()
  }

  getExpansionTeamTarget() {
    const previousMonthTarget = this.getPreviousMonthTarget()
    return new ExpansionTeamMonthlyTarget(this.currentMonthTarget, previousMonthTarget).getTarget()
  }

  getFields(): ExposedFields {
    return {
      ...this.currentMonthTarget.getFields(),
      acquisitionTarget: this.getAcquisitionTeamTarget(),
      expansionTarget: this.getExpansionTeamTarget()
    }
  }


  private findTargetForMonthAndYear(month: number, year: number): MonthlyTargetEntity | undefined {
    return this.monthlyTargets.find(item => item.isForMonth(month) && item.isForYear(year))
  }

  private setCurrentMonthTarget() {
    const target = this.findTargetForMonthAndYear(this.month, this.year)
    if (!target) throw Error('Monthly target not found')
    this.currentMonthTarget = target
  }

  //TODO Refactor to reuse logic
  private getPreviousMonthTarget() {
    const prevMonth = this.month - 1
    if (prevMonth < 1) {
      return new MonthlyTargetEntity({
        month: 12,
        year: 2021,
        recurringRevenue: PREVIOUS_YEAR_RECURRING_REVENUE,
        churnRate: 0,
        downgradeRate: 0,
        upgradeRate: 0
      })
    }
    const prevMonthTarget = this.findTargetForMonthAndYear(prevMonth, this.year)
    if (!prevMonthTarget) throw new Error('Previous month target not found')
    return prevMonthTarget
  }


}