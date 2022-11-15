import {Entity} from "../../../common/Entity";
import {ExpansionTargetFormula} from "../../formulas/team/ExpansionTargetForumula";
import {MonthlyTarget, MonthlyTargetEntityExposedFields} from "../MonthlyTarget";
import {SalesTeamMonthlyTarget} from "./SalesTeamMonthlyTarget";

interface ExposedFields extends MonthlyTargetEntityExposedFields {
}


export class ExpansionTeamMonthlyTarget implements Entity<ExposedFields>, SalesTeamMonthlyTarget {
  private monthlyTarget: MonthlyTarget
  private previousMonthlyTarget: MonthlyTarget

  constructor(target: MonthlyTarget, previousMonthTarget: MonthlyTarget) {
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

  isValid(): boolean {
    return this.monthlyTarget.isValid() && this.previousMonthlyTarget.isValid();
  }
}