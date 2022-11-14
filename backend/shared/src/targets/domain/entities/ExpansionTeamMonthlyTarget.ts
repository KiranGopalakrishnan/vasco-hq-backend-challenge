import {Entity} from "../../common/Entity";
import {MonthlyTargetEntity} from "../entities/MonthlyTargetEntity";
import {ExpansionTargetFormula} from "../formulaes/team/ExpansionTargetForumula";
import {TeamMonthlyTargetCalculator} from "./TeamMonthlyTargetCalculator";

interface ExposedFields {
}


export class ExpansionTeamMonthlyTarget implements Entity<ExposedFields>, TeamMonthlyTargetCalculator {
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