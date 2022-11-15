import {Entity} from "../../../common/Entity";
import {TargetList} from "../../data-structures/TargetList";
import {MonthlyTarget, MonthlyTargetEntityExposedFields} from "../MonthlyTarget";
import {AcquisitionTeamMonthlyTarget} from "./AcquisitionTeamMonthlyTarget";
import {ExpansionTeamMonthlyTarget} from "./ExpansionTeamMonthlyTarget";

interface ExposedFields extends MonthlyTargetEntityExposedFields {
  acquisitionTarget: number,
  expansionTarget: number
}

export class TeamMonthlyTarget implements Entity<ExposedFields> {
  private readonly monthlyTargetList: TargetList = new TargetList()
  private readonly month: number
  private readonly year: number
  private currentMonthTarget!: MonthlyTarget | null

  constructor(monthlyTargets: MonthlyTarget[], month: number, year: number) {
    this.monthlyTargetList = new TargetList(monthlyTargets)
    this.month = month
    this.year = year
    this.setCurrentMonthTarget()
  }

  isValid(): boolean {
    return !!this.currentMonthTarget
  }

  getAcquisitionTeamTarget() {
    const previousMonthTarget = this.monthlyTargetList.getPreviousMonth(this.month, this.year)
    if (!this.currentMonthTarget) throw new Error('Monthly target is required to calculate Acq team target')
    return new AcquisitionTeamMonthlyTarget(this.currentMonthTarget, previousMonthTarget).getTarget()
  }

  getExpansionTeamTarget() {
    const previousMonthTarget = this.monthlyTargetList.getPreviousMonth(this.month, this.year)
    if (!this.currentMonthTarget) throw new Error('Monthly target is required to calculate Exp team target')
    return new ExpansionTeamMonthlyTarget(this.currentMonthTarget, previousMonthTarget).getTarget()
  }

  getFields(): ExposedFields {
    if (!this.currentMonthTarget) throw new Error('Monthly target could not be found')
    return {
      ...this.currentMonthTarget.getFields(),
      acquisitionTarget: this.getAcquisitionTeamTarget(),
      expansionTarget: this.getExpansionTeamTarget()
    }
  }

  private setCurrentMonthTarget() {
    this.currentMonthTarget = this.monthlyTargetList.findTargetForMonth(this.month, this.year)
  }
}