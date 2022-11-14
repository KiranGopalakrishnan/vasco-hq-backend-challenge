import {Entity} from "../../common/Entity";
import {Quarter} from "../../common/Quarter";
import {MonthlyTargetEntity} from "./MonthlyTargetEntity";
import {QuarterlyEntityExposedFields, QuarterlyTargetEntity} from "./QuarterlyTargetEntity";
import {SalesTeamMonthlyTargetEntity} from "./SalesTeamMonthlyTargetEntity";

interface ExposedFields extends QuarterlyEntityExposedFields {
  acquisitionTarget: number,
  expansionTarget: number
}

export class SalesTeamQuarterlyTargetEntity implements Entity<ExposedFields> {
  private readonly quarter!: Quarter
  private readonly year!: number
  private readonly targets: MonthlyTargetEntity[] = []
  private readonly targetsForQuarter: MonthlyTargetEntity[] = []
  private readonly quarterlyTargetEntity: QuarterlyTargetEntity

  constructor(targets: MonthlyTargetEntity[], quarter: number, year: number) {
    this.targets = targets
    this.quarter = new Quarter(quarter, year)
    this.year = year
    this.targetsForQuarter = this.findAllTargetsForQuarter(targets)
    this.quarterlyTargetEntity = new QuarterlyTargetEntity(targets, quarter, year)
  }

  getExpansionTeamTarget() {
    const teamMonthlyTargets = this.targetsForQuarter.map(target => new SalesTeamMonthlyTargetEntity(this.targets, target.getFields().month, target.getFields().year))
    return teamMonthlyTargets.reduce((prev, current) => {
      prev += current.getExpansionTeamTarget()
      return prev
    }, 0)
  }

  getAcquisitionTeamTarget() {
    const teamMonthlyTargets = this.targetsForQuarter.map(target => new SalesTeamMonthlyTargetEntity(this.targets, target.getFields().month, target.getFields().year))
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

  private findAllTargetsForQuarter(targets: MonthlyTargetEntity[]) {
    return targets.filter(target => target.isForQuarter(this.quarter.getQuarter()) && target.isForYear(this.year))
  }
}