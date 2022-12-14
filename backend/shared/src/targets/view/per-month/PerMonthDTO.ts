import {BaseTargetDTO, TargetDTOArgs} from "../../common/BaseTargetDTO";


interface PerMonthTargetArgs extends TargetDTOArgs {
  month: number;
}


export class PerMonthDTO extends BaseTargetDTO {
  readonly month!: number;

  constructor(args: PerMonthTargetArgs) {
    super(args)
    this.month = args.month;
  }
}