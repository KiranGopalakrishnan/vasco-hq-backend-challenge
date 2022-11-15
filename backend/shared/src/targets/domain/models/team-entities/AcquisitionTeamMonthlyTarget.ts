import {Entity} from "../../../common/Entity";
import {AcquisitionTargetFormula} from "../../formulas/team/AcquisitonTargetFormula";
import {MonthlyTarget, MonthlyTargetEntityExposedFields} from "../MonthlyTarget";
import {SalesTeamMonthlyTarget} from "./SalesTeamMonthlyTarget";

interface ExposedFields extends MonthlyTargetEntityExposedFields {
}


export class AcquisitionTeamMonthlyTarget implements Entity<ExposedFields>, SalesTeamMonthlyTarget {
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
    return new AcquisitionTargetFormula(
      this.monthlyTarget.getFields().recurringRevenue,
      this.previousMonthlyTarget.getFields().recurringRevenue
    ).calculate()
  }

  isValid(): boolean {
    return this.monthlyTarget.isValid() && this.previousMonthlyTarget.isValid();
  }
}