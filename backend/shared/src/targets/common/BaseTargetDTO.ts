export interface TargetDTOArgs {
  year: number,
  recurringRevenue: number,
  churnRate: number,
  downgradeRate: number,
  upgradeRate: number
}


export class BaseTargetDTO {
  readonly year!: number;
  protected recurringRevenue!: number;
  protected churnRate!: number;
  protected downgradeRate!: number;
  protected upgradeRate!: number;

  constructor(args: TargetDTOArgs) {
    this.year = args.year;
    this.recurringRevenue = args.recurringRevenue;
    this.downgradeRate = this.toFloat(args.downgradeRate);
    this.upgradeRate = this.toFloat(args.upgradeRate);
    this.churnRate = this.toFloat(args.churnRate);
  }

  protected toFloat(v: number): number {
    return parseFloat((v / 100).toFixed(3))
  }
}