import {autoInjectable} from "tsyringe";
import {JSONDataSource} from "../../db/JSONDataSource";
import {MonthlyTarget} from "./models/MonthlyTarget";

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

  async getAllTargets(): Promise<MonthlyTarget[]> {
    //Probably a better idea to load this once as the JSON doesn't change , but a constructor cannot be async , so reading it when neccessory
    const data = await this.dataSource.read()
    return data.map(item => new MonthlyTarget(item))
  }
}