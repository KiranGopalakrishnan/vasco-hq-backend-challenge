import {Entity} from "../../common/Entity";
import {MonthlyTargetEntity} from "../entities/MonthlyTargetEntity";
import {AcquisitionTargetFormula} from "../formulaes/team/AcquisitonTargetFormula";
import {TeamMonthlyTargetCalculator} from "./TeamMonthlyTargetCalculator";

interface ExposedFields {
}


export class AcquisitionTeamMonthlyTarget implements Entity<ExposedFields>, TeamMonthlyTargetCalculator {
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
    return new AcquisitionTargetFormula(
      this.monthlyTarget.getFields().recurringRevenue,
      this.previousMonthlyTarget.getFields().recurringRevenue
    ).calculate()
  }
}