import {Formula} from "../../common/Formula";
import {MonthlyTargetEntity} from "../entities/MonthlyTargetEntity";

const MONTHS_IN_A_QUARTER = 3

export class AverageRecurringRevenueFormula implements Formula {
  constructor(private targets: MonthlyTargetEntity[]) {
  }

  calculate(): number {
    const sumOfRecurringRevenue = this.targets.reduce((prev, current) => {
      prev += current.getFields().recurringRevenue
      return prev
    }, 0)
    return sumOfRecurringRevenue / MONTHS_IN_A_QUARTER
  }
}