import {BaseTargetDTO, TargetDTOArgs} from "../../../common/BaseTargetDTO";

interface Args extends TargetDTOArgs {
  quarter: number;
  acquisitionTarget: number;
  expansionTarget: number;
}


export class TeamQuarterlyTargetDTO extends BaseTargetDTO {
  readonly quarter!: number;
  readonly acquisitionTarget!: number;
  readonly expansionTarget!: number;

  constructor(args: Args) {
    super(args)
    this.quarter = args.quarter;
    this.upgradeRate = this.toRate(args.upgradeRate)
    this.downgradeRate = this.toRate(args.downgradeRate)
    this.churnRate = this.toRate(args.churnRate)
    this.acquisitionTarget = this.toFixed(args.acquisitionTarget)
    this.expansionTarget = this.toFixed(args.expansionTarget)
  }
}