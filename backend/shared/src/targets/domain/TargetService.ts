import {autoInjectable} from "tsyringe";
import {ApplicationError, HttpError} from "../../utils/HttpError";
import {MonthlyTargetEntity} from "./entities/MonthlyTargetEntity";
import {QuarterlyTargetAggregate} from "./entities/QuarterlyTargetAggregate";
import {TeamMonthlyTargetAggregate} from "./entities/team-entities/TeamMonthlyTargetAggregate";
import {TeamQuarterlyTargetAggregate} from "./entities/team-entities/TeamQuarterlyTargetAggregate";
import {TargetRepository} from "./TargetRepository";


@autoInjectable()
export class TargetService {

  constructor(private targetRepository: TargetRepository) {
  }

  async getTargetForMonth(month: number, year: number): Promise<MonthlyTargetEntity | null> {
    try {
      const allTargets = await this.targetRepository.getAllTargets()
      const targetForYear = allTargets.find(target => target.isForMonth(month) && target.isForYear(year))
      if (!targetForYear) return null
      return targetForYear
    } catch (e) {
      throw new ApplicationError(HttpError.INTERNAL_SERVER_ERROR)
    }
  }

  async getTargetFromQuarter(quarter: number, year: number): Promise<QuarterlyTargetAggregate | null> {
    try {
      const allTargets = await this.targetRepository.getAllTargets()
      return new QuarterlyTargetAggregate(allTargets, quarter, year)
    } catch (e) {
      throw new ApplicationError(HttpError.INTERNAL_SERVER_ERROR)
    }
  }

  async getTeamTargetsForMonth(month: number, year: number): Promise<TeamMonthlyTargetAggregate | null> {
    try {
      const allTargets = await this.targetRepository.getAllTargets()
      return new TeamMonthlyTargetAggregate(allTargets, month, year)
    } catch (e) {
      throw new ApplicationError(HttpError.INTERNAL_SERVER_ERROR)
    }
  }

  async getTeamTargetsFromQuarter(quarter: number, year: number): Promise<TeamQuarterlyTargetAggregate | null> {
    try {
      const allTargets = await this.targetRepository.getAllTargets()
      return new TeamQuarterlyTargetAggregate(allTargets, quarter, year)
    } catch (e) {
      throw new ApplicationError(HttpError.INTERNAL_SERVER_ERROR)
    }
  }

}