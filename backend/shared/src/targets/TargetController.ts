import {Service} from "typedi";
import {ApplicationError} from "../utils/HttpError";
import {QuarterlyTargetEntity} from "./domain/entities/QuarterlyTargetEntity";
import {TargetService} from "./domain/TargetService";

import {MonthlyTargetDTO} from "./per-month/MonthlyTargetDTO";
import {PerMonthDTOTransformer} from "./per-month/PerMonthDTOTransformer";
import {PerQuarterDTOTransformer} from "./per-quarter/PerQuarterDTOTransformer";

@Service()
export class TargetController {

  constructor(private targetService: TargetService) {
  }

  async getTargetsPerMonthForYear(month: number, year: number): Promise<MonthlyTargetDTO | Record<never, never>> {
    const targetEntity = await this.targetService.getTargetForMonth(month, year)
    if (!targetEntity) throw new ApplicationError()
    return new PerMonthDTOTransformer().toDTO(targetEntity)
  }

  async getTargetsPerQuarter(quarter: number, year: number): Promise<QuarterlyTargetEntity | Record<never, never>> {
    const quarterlyTargets = await this.targetService.getTargetFromQuarter(quarter, year)
    if (!quarterlyTargets) throw new ApplicationError()
    return new PerQuarterDTOTransformer().toDTO(quarterlyTargets)
  }

}