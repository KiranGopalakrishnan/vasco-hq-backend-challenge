import {BaseTargetDTO, TargetDTOArgs} from "../common/BaseTargetDTO";


interface PerMonthTargetArgs extends TargetDTOArgs {
  quarter: number;
}


export class QuarterlyTargetDTO extends BaseTargetDTO {
  readonly quarter!: number;

  constructor(args: PerMonthTargetArgs) {
    super(args)
    this.quarter = args.quarter;
    this.upgradeRate = this.toFloat(args.upgradeRate)
    this.downgradeRate = this.toFloat(args.downgradeRate)
    this.churnRate = this.toFloat(args.churnRate)
  }
}