import {autoInjectable} from "tsyringe";
import {ApplicationError, HttpError} from "../utils/HttpError";
import {TargetService} from "./domain/TargetService";
import {PerMonthDTO} from "./view/per-month/PerMonthDTO";
import {PerMonthDTOTransformer} from "./view/per-month/PerMonthDTOTransformer";
import {TeamTargetPerMonthDTO} from "./view/per-month/team/TeamTargetPerMonthDTO";
import {TeamTargetPerMonthDTOTransformer} from "./view/per-month/team/TeamTargetPerMonthDTOTransformer";
import {PerQuarterDTO} from "./view/per-quarter/PerQuarterDTO";
import {PerQuarterDTOTransformer} from "./view/per-quarter/PerQuarterDTOTransformer";
import {TeamPerQuarterDTOTransformer} from "./view/per-quarter/team/TeamPerQuarterDTOTransformer";
import {TeamQuarterlyTargetDTO} from "./view/per-quarter/team/TeamQuarterlyTargetDTO";

@autoInjectable()
export class TargetController {

  constructor(private targetService: TargetService) {
  }

  async getTargetsPerMonthForYear(month: number, year: number): Promise<PerMonthDTO | Record<never, never>> {
    if (month < 1 || month > 12) throw new ApplicationError(HttpError.BAD_REQUEST, 'Month must be valid')
    const targetEntity = await this.targetService.getTargetForMonth(month, year)
    if (!targetEntity) return {}
    return new PerMonthDTOTransformer().toDTO(targetEntity)
  }

  async getTargetsPerQuarter(quarter: number, year: number): Promise<PerQuarterDTO | Record<never, never>> {
    if (quarter < 1 || quarter > 4) throw new ApplicationError(HttpError.BAD_REQUEST, 'Quarter must be valid')
    const targetEntity = await this.targetService.getTargetFromQuarter(quarter, year)
    if (!targetEntity) return {}
    return new PerQuarterDTOTransformer().toDTO(targetEntity)
  }

  async getTeamTargetsPerMonthForYear(month: number, year: number): Promise<TeamTargetPerMonthDTO | Record<never, never>> {
    if (month < 1 || month > 12) throw new ApplicationError(HttpError.BAD_REQUEST, 'Month must be valid')
    const targetEntity = await this.targetService.getTeamTargetsForMonth(month, year)
    if (!targetEntity) return {}
    return new TeamTargetPerMonthDTOTransformer().toDTO(targetEntity)
  }

  async getTeamTargetsPerQuarter(quarter: number, year: number): Promise<TeamQuarterlyTargetDTO | Record<never, never>> {
    if (quarter < 1 || quarter > 4) throw new ApplicationError(HttpError.BAD_REQUEST, 'Quarter must be valid')
    const targetEntity = await this.targetService.getTeamTargetsFromQuarter(quarter, year)
    if (!targetEntity) return {}

    return new TeamPerQuarterDTOTransformer().toDTO(targetEntity)
  }

}