import {Formula} from "../../common/Formula";
import {AverageRecurringRevenueFormula} from "./AverageRecurringRevenueFormula";
import {QuarterlyAmountFormula} from "./QuarterlyAmountFormula";

export class QuarterlyRateFormula implements Formula {
  constructor(private quarterlyAmountCalculator: QuarterlyAmountFormula, private avgRecRevCalculator: AverageRecurringRevenueFormula) {
  }

  calculate(): number {
    return this.quarterlyAmountCalculator.calculate() / this.avgRecRevCalculator.calculate()
  }

}