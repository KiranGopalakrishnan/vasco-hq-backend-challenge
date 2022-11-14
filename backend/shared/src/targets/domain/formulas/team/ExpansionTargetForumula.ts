import {Formula} from "../../../common/Formula";

const RATE_CONSTANT = 1

export class ExpansionTargetFormula implements Formula {
  private readonly previousMonthRecRev: number;
  private readonly netRetentionRate: number;

  constructor(previousMonthRecRev: number, netRetentionRate: number) {
    this.previousMonthRecRev = previousMonthRecRev
    this.netRetentionRate = netRetentionRate
  }

  calculate(): number {
    const netRetentionRate = this.netRetentionRate
    return this.previousMonthRecRev * (RATE_CONSTANT - netRetentionRate)
  }
}