import {Formula} from "../../common/Formula";

export class QuarterlyRateFormula implements Formula {
  constructor(private quarterlyAmountCalculator: Formula, private avgRecRevCalculator: Formula) {
  }

  calculate(): number {
    return this.quarterlyAmountCalculator.calculate() / this.avgRecRevCalculator.calculate()
  }

}