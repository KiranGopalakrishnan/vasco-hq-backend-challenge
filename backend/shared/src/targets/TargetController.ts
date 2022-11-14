import {Service} from "typedi";
import {ApplicationError} from "../utils/HttpError";
import {TargetService} from "./domain/TargetService";
import {MonthlyTargetDTO} from "./per-month/MonthlyTargetDTO";
import {PerMonthDTOTransformer} from "./per-month/PerMonthDTOTransformer";
import {SalesTeamMonthlyTargetDTO} from "./per-month/team/SalesTeamMonthlyTargetDTO";
import {SalesTeamPerMonthDTOTransformer} from "./per-month/team/SalesTeamPerMonthDTOTransformer";
import {PerQuarterDTOTransformer} from "./per-quarter/PerQuarterDTOTransformer";
import {QuarterlyTargetDTO} from "./per-quarter/QuarterlyTargetDTO";
import {SalesTeamPerQuarterDTOTransformer} from "./per-quarter/team/PerQuarterDTOTransformer";
import {SalesTeamQuarterlyTargetDTO} from "./per-quarter/team/SalesTeamQuarterlyTargetDTO";

@Service()
export class TargetController {

  constructor(private targetService: TargetService) {
  }

  async getTargetsPerMonthForYear(month: number, year: number): Promise<MonthlyTargetDTO | Record<never, never>> {
    const targetEntity = await this.targetService.getTargetForMonth(month, year)
    if (!targetEntity) throw new ApplicationError()
    return new PerMonthDTOTransformer().toDTO(targetEntity)
  }

  async getTargetsPerQuarter(quarter: number, year: number): Promise<QuarterlyTargetDTO | Record<never, never>> {
    const targetEntity = await this.targetService.getTargetFromQuarter(quarter, year)
    if (!targetEntity) throw new ApplicationError()
    return new PerQuarterDTOTransformer().toDTO(targetEntity)
  }

  async getTeamTargetsPerMonthForYear(month: number, year: number): Promise<SalesTeamMonthlyTargetDTO | Record<never, never>> {
    const targetEntity = await this.targetService.getTeamTargetsForMonth(month, year)
    if (!targetEntity) throw new ApplicationError()
    return new SalesTeamPerMonthDTOTransformer().toDTO(targetEntity)
  }

  async getTeamTargetsPerQuarter(quarter: number, year: number): Promise<SalesTeamQuarterlyTargetDTO | Record<never, never>> {
    const targetEntity = await this.targetService.getTeamTargetsFromQuarter(quarter, year)
    if (!targetEntity) throw new ApplicationError()

    return new SalesTeamPerQuarterDTOTransformer().toDTO(targetEntity)
  }

}