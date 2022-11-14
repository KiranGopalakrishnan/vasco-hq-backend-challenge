import {Service} from "typedi";
import {MonthlyTargetEntity} from "./entities/MonthlyTargetEntity";
import {QuarterlyTargetEntity} from "./entities/QuarterlyTargetEntity";
import {SalesTeamMonthlyTargetEntity} from "./entities/SalesTeamMonthlyTargetEntity";
import {SalesTeamQuarterlyTargetEntity} from "./entities/SalesTeamQuarterlyTargetEntity";
import {TargetRepository} from "./TargetRepository";


@Service()
export class TargetService {

  constructor(private targetRepository: TargetRepository) {
  }

  async getTargetForMonth(month: number, year: number): Promise<MonthlyTargetEntity | null> {
    const allTargets = await this.targetRepository.getAllTargets()
    const targetForYear = allTargets.find(target => target.isForMonth(month) && target.isForYear(year))
    if (!targetForYear) return null
    return targetForYear
  }

  async getTargetFromQuarter(quarter: number, year: number): Promise<QuarterlyTargetEntity | null> {
    const allTargets = await this.targetRepository.getAllTargets()
    return new QuarterlyTargetEntity(allTargets, quarter, year)
  }

  async getTeamTargetsForMonth(month: number, year: number): Promise<SalesTeamMonthlyTargetEntity | null> {
    const allTargets = await this.targetRepository.getAllTargets()
    return new SalesTeamMonthlyTargetEntity(allTargets, month, year)
  }

  async getTeamTargetsFromQuarter(quarter: number, year: number): Promise<SalesTeamQuarterlyTargetEntity | null> {
    const allTargets = await this.targetRepository.getAllTargets()
    return new SalesTeamQuarterlyTargetEntity(allTargets, quarter, year)
  }

}