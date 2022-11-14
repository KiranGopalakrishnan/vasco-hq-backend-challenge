import {Formula} from "../../../common/Formula";

const RATE_CONSTANT = 1

export class NetRetentionRateFormula implements Formula {
  private readonly upgradeRate: number;
  private readonly downgradeRate: number;
  private readonly churnRate: number;

  constructor(upgradeRate: number, downgradeRate: number, churnRate: number) {
    this.upgradeRate = upgradeRate
    this.downgradeRate = downgradeRate
    this.churnRate = churnRate
  }

  calculate(): number {
    return RATE_CONSTANT - this.downgradeRate + this.upgradeRate - this.churnRate;
  }


}