import {Entity} from "../../../common/Entity";
import {Quarter} from "../../../common/Quarter";
import {TargetList} from "../../data-structures/TargetList";
import {MonthlyTargetEntity} from "../MonthlyTargetEntity";
import {QuarterlyEntityExposedFields, QuarterlyTargetAggregate} from "../QuarterlyTargetAggregate";
import {TeamMonthlyTargetAggregate} from "./TeamMonthlyTargetAggregate";

interface ExposedFields extends QuarterlyEntityExposedFields {
  acquisitionTarget: number,
  expansionTarget: number
}

export class TeamQuarterlyTargetAggregate implements Entity<ExposedFields> {
  private readonly quarter!: Quarter
  private readonly year!: number
  private readonly targets: TargetList = new TargetList()
  private readonly quarterlyTargetEntity: QuarterlyTargetAggregate

  constructor(targets: MonthlyTargetEntity[], quarter: number, year: number) {
    this.targets = new TargetList(targets)
    this.quarter = new Quarter(quarter, year)
    this.year = year
    this.quarterlyTargetEntity = new QuarterlyTargetAggregate(targets, quarter, year)
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
    return function (target: MonthlyTargetEntity) {
      const {month, year} = target.getFields()
      return new TeamMonthlyTargetAggregate(targetList.getAsArray(), month, year)
    }
  }
}