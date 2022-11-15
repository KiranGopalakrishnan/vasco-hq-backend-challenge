import {Entity} from "../../../common/Entity";
import {Quarter} from "../../../common/Quarter";
import {TargetList} from "../../data-structures/TargetList";
import {MonthlyTarget} from "../MonthlyTarget";
import {QuarterlyEntityExposedFields, QuarterlyTarget} from "../QuarterlyTarget";
import {TeamMonthlyTarget} from "./TeamMonthlyTarget";

interface ExposedFields extends QuarterlyEntityExposedFields {
  acquisitionTarget: number,
  expansionTarget: number
}

export class TeamQuarterlyTarget implements Entity<ExposedFields> {
  private readonly quarter!: Quarter
  private readonly year!: number
  private readonly targets: TargetList = new TargetList()
  private readonly quarterlyTargetEntity: QuarterlyTarget

  constructor(targets: MonthlyTarget[], quarter: number, year: number) {
    this.targets = new TargetList(targets)
    this.quarter = new Quarter(quarter, year)
    this.year = year
    this.quarterlyTargetEntity = new QuarterlyTarget(targets, quarter, year)
  }

  isValid(): boolean {
    return this.quarterlyTargetEntity.isValid()
  }

  getExpansionTeamTarget() {
    const targetsForQuarter = this.targets.findTargetsForQuarter(this.quarter.getQuarter(), this.year)
    const teamMonthlyTargets = targetsForQuarter.map(this.fromTargetToTeamMonthlyTargetAggregate(this.targets))
    return teamMonthlyTargets.reduce((prev, current) => {
      prev += current.getExpansionTeamTarget()
      return prev
    }, 0)
  }

  getAcquisitionTeamTarget() {
    const targetsForQuarter = this.targets.findTargetsForQuarter(this.quarter.getQuarter(), this.year)
    const teamMonthlyTargets = targetsForQuarter.map(this.fromTargetToTeamMonthlyTargetAggregate(this.targets))
    return teamMonthlyTargets.reduce((prev, current) => {
      prev += current.getAcquisitionTeamTarget()
      return prev
    }, 0)
  }

  getFields(): ExposedFields {
    return {
      ...this.quarterlyTargetEntity.getFields(),
      acquisitionTarget: this.getAcquisitionTeamTarget(),
      expansionTarget: this.getExpansionTeamTarget()
    }
  }

  fromTargetToTeamMonthlyTargetAggregate(targetList: TargetList) {
    return function (target: MonthlyTarget) {
      const {month, year} = target.getFields()
      return new TeamMonthlyTarget(targetList.getAsArray(), month, year)
    }
  }
}