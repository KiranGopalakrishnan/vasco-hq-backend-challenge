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
    this.downgradeRate = this.toRate(args.downgradeRate);
    this.upgradeRate = this.toRate(args.upgradeRate);
    this.churnRate = this.toRate(args.churnRate);
  }

  protected toRate(value: number): number {
    return this.toFixed(value)
  }

  protected toFixed(value: number, digits: number = 3) {
    return parseFloat(value.toFixed(digits))
  }
}