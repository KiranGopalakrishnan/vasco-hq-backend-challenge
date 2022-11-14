import {Entity} from "../../../common/Entity";
import {ExpansionTargetFormula} from "../../formulas/team/ExpansionTargetForumula";
import {MonthlyTargetEntity, MonthlyTargetEntityExposedFields} from "../MonthlyTargetEntity";
import {SalesTeamMonthlyTargetEntity} from "./SalesTeamMonthlyTargetEntity";

interface ExposedFields extends MonthlyTargetEntityExposedFields {
}


export class ExpansionTeamMonthlyTargetEntity implements Entity<ExposedFields>, SalesTeamMonthlyTargetEntity {
  private monthlyTarget: MonthlyTargetEntity
  private previousMonthlyTarget: MonthlyTargetEntity

  constructor(target: MonthlyTargetEntity, previousMonthTarget: MonthlyTargetEntity) {
    this.monthlyTarget = target
    this.previousMonthlyTarget = previousMonthTarget
  }

  getFields(): ExposedFields {
    return {
      ...this.monthlyTarget.getFields(),
    };
  }

  getTarget(): number {
    return new ExpansionTargetFormula(
      this.previousMonthlyTarget.getFields().recurringRevenue,
      this.monthlyTarget.getNetRetentionRevenue(),
    ).calculate()
  }
}