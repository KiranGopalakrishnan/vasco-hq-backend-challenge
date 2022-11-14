import {autoInjectable} from "tsyringe";
import {ApplicationError, HttpError} from "../../utils/HttpError";
import {TargetList} from "./data-structures/TargetList";
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
      const targetForYear = new TargetList(allTargets).findTargetForMonth(month, year)
      if (!targetForYear) return null
      return targetForYear
    } catch (e) {
      throw new ApplicationError(HttpError.INTERNAL_SERVER_ERROR)
    }
  }

  async getTargetFromQuarter(quarter: number, year: number): Promise<QuarterlyTargetAggregate | null> {
    try {
      const allTargets = await this.targetRepository.getAllTargets()
      const quarterlyAggregate = new QuarterlyTargetAggregate(allTargets, quarter, year)
      if (!quarterlyAggregate.isValid()) return null
      return quarterlyAggregate
    } catch (e) {
      throw new ApplicationError(HttpError.INTERNAL_SERVER_ERROR)
    }
  }

  async getTeamTargetsForMonth(month: number, year: number): Promise<TeamMonthlyTargetAggregate | null> {
    try {
      const allTargets = await this.targetRepository.getAllTargets()
      const teamMonthlyAggregate = new TeamMonthlyTargetAggregate(allTargets, month, year)
      if (!teamMonthlyAggregate.isValid()) return null
      return teamMonthlyAggregate
    } catch (e) {
      throw new ApplicationError(HttpError.INTERNAL_SERVER_ERROR).fromError(e)
    }
  }

  async getTeamTargetsFromQuarter(quarter: number, year: number): Promise<TeamQuarterlyTargetAggregate | null> {
    try {
      const allTargets = await this.targetRepository.getAllTargets()
      const teamQuarterlyAggregate = new TeamQuarterlyTargetAggregate(allTargets, quarter, year)
      if (!teamQuarterlyAggregate.isValid()) return null
      return teamQuarterlyAggregate
    } catch (e) {
      throw new ApplicationError(HttpError.INTERNAL_SERVER_ERROR).fromError(e)
    }
  }

}