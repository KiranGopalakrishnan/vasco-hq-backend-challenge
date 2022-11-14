import {Entity} from "../../../common/Entity";
import {AcquisitionTargetFormula} from "../../formulas/team/AcquisitonTargetFormula";
import {MonthlyTargetEntity, MonthlyTargetEntityExposedFields} from "../MonthlyTargetEntity";
import {SalesTeamMonthlyTargetEntity} from "./SalesTeamMonthlyTargetEntity";

interface ExposedFields extends MonthlyTargetEntityExposedFields {
}


export class AcquisitionTeamMonthlyTargetEntity implements Entity<ExposedFields>, SalesTeamMonthlyTargetEntity {
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

  isValid(): boolean {
    return this.monthlyTarget.isValid() && this.previousMonthlyTarget.isValid();
  }
}