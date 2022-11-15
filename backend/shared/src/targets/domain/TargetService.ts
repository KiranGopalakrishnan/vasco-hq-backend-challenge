import {autoInjectable} from "tsyringe";
import {DomainError, DomainErrorCode} from "../../utils/DomainError";
import {TargetList} from "./data-structures/TargetList";
import {MonthlyTarget} from "./models/MonthlyTarget";
import {QuarterlyTarget} from "./models/QuarterlyTarget";
import {TeamMonthlyTarget} from "./models/team-entities/TeamMonthlyTarget";
import {TeamQuarterlyTarget} from "./models/team-entities/TeamQuarterlyTarget";
import {TargetRepository} from "./TargetRepository";


@autoInjectable()
export class TargetService {

  constructor(private targetRepository: TargetRepository) {
  }

  async getTargetForMonth(month: number, year: number): Promise<MonthlyTarget | null> {
    try {
      const allTargets = await this.targetRepository.getAllTargets()
      const targetForYear = new TargetList(allTargets).findTargetForMonth(month, year)
      if (!targetForYear) return null
      return targetForYear
    } catch (e) {
      throw new DomainError(DomainErrorCode.INTERNAL_SERVER_ERROR)
    }
  }

  async getTargetFromQuarter(quarter: number, year: number): Promise<QuarterlyTarget | null> {
    try {
      const allTargets = await this.targetRepository.getAllTargets()
      const quarterlyAggregate = new QuarterlyTarget(allTargets, quarter, year)
      if (!quarterlyAggregate.isValid()) return null
      return quarterlyAggregate
    } catch (e) {
      throw new DomainError(DomainErrorCode.INTERNAL_SERVER_ERROR)
    }
  }

  async getTeamTargetsForMonth(month: number, year: number): Promise<TeamMonthlyTarget | null> {
    try {
      const allTargets = await this.targetRepository.getAllTargets()
      const teamMonthlyAggregate = new TeamMonthlyTarget(allTargets, month, year)
      if (!teamMonthlyAggregate.isValid()) return null
      return teamMonthlyAggregate
    } catch (e) {
      throw new DomainError(DomainErrorCode.INTERNAL_SERVER_ERROR).fromError(e)
    }
  }

  async getTeamTargetsFromQuarter(quarter: number, year: number): Promise<TeamQuarterlyTarget | null> {
    try {
      const allTargets = await this.targetRepository.getAllTargets()
      const teamQuarterlyAggregate = new TeamQuarterlyTarget(allTargets, quarter, year)
      if (!teamQuarterlyAggregate.isValid()) return null
      return teamQuarterlyAggregate
    } catch (e) {
      throw new DomainError(DomainErrorCode.INTERNAL_SERVER_ERROR).fromError(e)
    }
  }

}