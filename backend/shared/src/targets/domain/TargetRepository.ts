import {autoInjectable} from "tsyringe";
import {JSONDataSource} from "../../db/JSONDataSource";
import {MonthlyTargetEntity} from "./entities/MonthlyTargetEntity";

type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface Target {
  month: Month,
  year: number,
  recurringRevenue: number,
  churnRate: number,
  downgradeRate: number,
  upgradeRate: number
}

@autoInjectable()
export class TargetRepository {
  private dataSource: JSONDataSource<Target>;

  public constructor(dataSource: JSONDataSource<Target>) {
    this.dataSource = dataSource
  }

  async getAllTargets(): Promise<MonthlyTargetEntity[]> {
    const data = await this.dataSource.read()
    return data.map(item => new MonthlyTargetEntity(item))
  }

}