import {Formula} from "../../common/Formula";
import {AverageRecurringRevenueCalculator} from "./AverageRecurringRevenueCalculator";
import {QuarterlyAmountCalculator} from "./QuarterlyAmountCalculator";

export class QuarterlyRateCalculator implements Formula {
  constructor(private quarterlyAmountCalculator: QuarterlyAmountCalculator, private avgRecRevCalculator: AverageRecurringRevenueCalculator) {
  }

  calculate(): number {
    return this.quarterlyAmountCalculator.calculate() / this.avgRecRevCalculator.calculate()
  }

}