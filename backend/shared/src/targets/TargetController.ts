import {autoInjectable} from "tsyringe";
import {DomainError} from "../utils/DomainError";
import {HttpError, HttpErrorCode} from "../utils/HttpError";
import {TargetService} from "./domain/TargetService";
import {PerMonthDTO} from "./view/per-month/PerMonthDTO";
import {PerMonthDTOTransformer} from "./view/per-month/PerMonthDTOTransformer";
import {TeamTargetPerMonthDTO} from "./view/per-month/team/TeamTargetPerMonthDTO";
import {TeamTargetPerMonthDTOTransformer} from "./view/per-month/team/TeamTargetPerMonthDTOTransformer";
import {PerQuarterDTO} from "./view/per-quarter/PerQuarterDTO";
import {PerQuarterDTOTransformer} from "./view/per-quarter/PerQuarterDTOTransformer";
import {TeamPerQuarterDTOTransformer} from "./view/per-quarter/team/TeamPerQuarterDTOTransformer";
import {TeamQuarterlyTargetDTO} from "./view/per-quarter/team/TeamQuarterlyTargetDTO";


/*
 * Technically this layer is unneccessory , since TRPC router is the view layer
 * But decided to keep this layer since i like to try and make the application code not rely too heavily on TRPC/ similar libaries
 * And make it easier to switch or move away from libraries if and when needed.
 */
@autoInjectable()
export class TargetController {

  constructor(private targetService: TargetService) {
  }

  async getTargetsPerMonthForYear(month: number, year: number): Promise<PerMonthDTO | Record<never, never>> {
    if (month < 1 || month > 12) throw new HttpError(HttpErrorCode.BAD_REQUEST, 'Month must be valid')
    try {
      const targetEntity = await this.targetService.getTargetForMonth(month, year)
      if (!targetEntity) return {}
      return new PerMonthDTOTransformer().toDTO(targetEntity)
    } catch (e) {
      throw HttpError.fromDomainError(e as DomainError)
    }
  }

  async getTargetsPerQuarter(quarter: number, year: number): Promise<PerQuarterDTO | Record<never, never>> {
    if (quarter < 1 || quarter > 4) throw new HttpError(HttpErrorCode.BAD_REQUEST, 'Quarter must be valid')
    try {
      const targetEntity = await this.targetService.getTargetFromQuarter(quarter, year)
      if (!targetEntity) return {}
      return new PerQuarterDTOTransformer().toDTO(targetEntity)
    } catch (e) {
      throw HttpError.fromDomainError(e as DomainError)
    }
  }

  async getTeamTargetsPerMonthForYear(month: number, year: number): Promise<TeamTargetPerMonthDTO | Record<never, never>> {
    if (month < 1 || month > 12) throw new HttpError(HttpErrorCode.BAD_REQUEST, 'Month must be valid')
    try {
      const targetEntity = await this.targetService.getTeamTargetsForMonth(month, year)
      if (!targetEntity) return {}
      return new TeamTargetPerMonthDTOTransformer().toDTO(targetEntity)
    } catch (e) {
      throw HttpError.fromDomainError(e as DomainError)
    }
  }

  async getTeamTargetsPerQuarter(quarter: number, year: number): Promise<TeamQuarterlyTargetDTO | Record<never, never>> {
    if (quarter < 1 || quarter > 4) throw new HttpError(HttpErrorCode.BAD_REQUEST, 'Quarter must be valid')
    try {
      const targetEntity = await this.targetService.getTeamTargetsFromQuarter(quarter, year)
      if (!targetEntity) return {}

      return new TeamPerQuarterDTOTransformer().toDTO(targetEntity)
    } catch (e) {
      throw HttpError.fromDomainError(e as DomainError)
    }
  }

}