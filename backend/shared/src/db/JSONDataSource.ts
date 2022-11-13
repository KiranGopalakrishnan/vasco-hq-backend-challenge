import * as fs from "fs/promises";
import {Service} from "typedi";
import {DataSource} from "./DataSource";

type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface Data {
  month: Month,
  year: number,
  recurringRevenue: number,
  churnRate: number,
  downgradeRate: number,
  upgradeRate: number
}

@Service()
export class JSONDataSource implements DataSource<Data[]> {
  async read(): Promise<Data[]> {
    try {
      const data = await fs.readFile('../data/targets.json', {encoding: 'utf8'});
      return JSON.parse(data)
    } catch (err) {
      throw err
    }
  }
}