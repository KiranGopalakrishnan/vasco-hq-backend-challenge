import {BaseTargetDTO, TargetDTOArgs} from "../../common/BaseTargetDTO";


interface PerMonthTargetArgs extends TargetDTOArgs {
  month: number;
  acquisitionTarget: number;
  expansionTarget: number;
}


export class SalesTeamMonthlyTargetDTO extends BaseTargetDTO {
  readonly month!: number;
  readonly acquisitionTarget!: number;
  readonly expansionTarget!: number;

  constructor(args: PerMonthTargetArgs) {
    super(args)
    this.month = args.month;
    this.acquisitionTarget = this.toFixed(args.acquisitionTarget)
    this.expansionTarget = this.toFixed(args.expansionTarget)
  }
}