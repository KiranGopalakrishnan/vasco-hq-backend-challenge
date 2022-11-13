import {Service} from "typedi";
import {JSONDataSource} from "../../db/JSONDataSource";
import {MonthlyTargetEntity} from "./entities/MonthlyTargetEntity";

@Service()
export class TargetRepository {
  private dataSource: JSONDataSource;

  public constructor(dataSource: JSONDataSource) {
    this.dataSource = dataSource
  }

  async getAllTargets(): Promise<MonthlyTargetEntity[]> {
    const data = await this.dataSource.read()
    return data.map(item => new MonthlyTargetEntity(item))
  }

}