import {Entity} from "../../../common/Entity";
import {TargetList} from "../../data-structures/TargetList";
import {MonthlyTargetEntity, MonthlyTargetEntityExposedFields} from "../MonthlyTargetEntity";
import {AcquisitionTeamMonthlyTargetEntity} from "./AcquisitionTeamMonthlyTargetEntity";
import {ExpansionTeamMonthlyTargetEntity} from "./ExpansionTeamMonthlyTargetEntity";

interface ExposedFields extends MonthlyTargetEntityExposedFields {
  acquisitionTarget: number,
  expansionTarget: number
}

export class TeamMonthlyTargetAggregate implements Entity<ExposedFields> {
  private readonly monthlyTargetList: TargetList = new TargetList()
  private readonly month: number
  private readonly year: number
  private currentMonthTarget!: MonthlyTargetEntity | null

  constructor(monthlyTargets: MonthlyTargetEntity[], month: number, year: number) {
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
    return new AcquisitionTeamMonthlyTargetEntity(this.currentMonthTarget, previousMonthTarget).getTarget()
  }

  getExpansionTeamTarget() {
    const previousMonthTarget = this.monthlyTargetList.getPreviousMonth(this.month, this.year)
    if (!this.currentMonthTarget) throw new Error('Monthly target is required to calculate Exp team target')
    return new ExpansionTeamMonthlyTargetEntity(this.currentMonthTarget, previousMonthTarget).getTarget()
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