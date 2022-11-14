import {BaseTargetDTO, TargetDTOArgs} from "../common/BaseTargetDTO";


interface PerMonthTargetArgs extends TargetDTOArgs {
  quarter: number;
}


export class QuarterlyTargetDTO extends BaseTargetDTO {
  readonly quarter!: number;

  constructor(args: PerMonthTargetArgs) {
    super(args)
    this.quarter = args.quarter;
    this.upgradeRate = this.toRate(args.upgradeRate)
    this.downgradeRate = this.toRate(args.downgradeRate)
    this.churnRate = this.toRate(args.churnRate)
  }
}