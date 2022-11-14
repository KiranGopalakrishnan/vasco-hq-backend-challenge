import {Formula} from "../../../common/Formula";

const RATE_CONSTANT = 1

export class AcquisitionTargetFormula implements Formula {
  private readonly currentMonthRecRev: number;
  private readonly previousMonthRecRev: number;

  constructor(currentMonthRecRev: number, previousMonthRecRev: number) {
    this.currentMonthRecRev = currentMonthRecRev
    this.previousMonthRecRev = previousMonthRecRev

  }

  calculate(): number {
    return this.currentMonthRecRev - this.previousMonthRecRev
  }
}