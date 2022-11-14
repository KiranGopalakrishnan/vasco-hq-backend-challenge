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
  private currentMonthTarget!: MonthlyTargetEntity

  constructor(monthlyTargets: MonthlyTargetEntity[], month: number, year: number) {
    this.monthlyTargetList = new TargetList(monthlyTargets)
    this.month = month
    this.year = year
    this.setCurrentMonthTarget()
  }

  getAcquisitionTeamTarget() {
    const previousMonthTarget = this.monthlyTargetList.getPreviousMonth(this.month, this.year)
    return new AcquisitionTeamMonthlyTargetEntity(this.currentMonthTarget, previousMonthTarget).getTarget()
  }

  getExpansionTeamTarget() {
    const previousMonthTarget = this.monthlyTargetList.getPreviousMonth(this.month, this.year)
    return new ExpansionTeamMonthlyTargetEntity(this.currentMonthTarget, previousMonthTarget).getTarget()
  }

  getFields(): ExposedFields {
    return {
      ...this.currentMonthTarget.getFields(),
      acquisitionTarget: this.getAcquisitionTeamTarget(),
      expansionTarget: this.getExpansionTeamTarget()
    }
  }

  private setCurrentMonthTarget() {
    const target = this.monthlyTargetList.findTargetForMonth(this.month, this.year)
    if (!target) throw Error('Monthly target not found')
    this.currentMonthTarget = target
  }
}