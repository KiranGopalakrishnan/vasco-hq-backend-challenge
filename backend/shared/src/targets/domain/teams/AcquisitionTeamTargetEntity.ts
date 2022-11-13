import {Entity} from "../../common/Entity";
import {MonthlyTargetEntity} from "../entities/MonthlyTargetEntity";
import {QuarterlyTargetEntity} from "../entities/QuarterlyTargetEntity";

interface Args {
  monthlyTargets: MonthlyTargetEntity[],
  quarterlyTargets: QuarterlyTargetEntity[],
}

interface ExposedFields {

}

export class AcquisitionTeamTargetEntity implements Entity<ExposedFields> {
  private readonly monthlyTargets: MonthlyTargetEntity[];
  private readonly quarterlyTargets: QuarterlyTargetEntity[];

  constructor(args: Args) {
    this.monthlyTargets = args.monthlyTargets;
    this.quarterlyTargets = args.quarterlyTargets;
  }

  getFields(): ExposedFields {
    return {};
  }
}