import * as fs from "fs/promises";
import path from "path";
import {autoInjectable} from "tsyringe";
import {DataSource} from "./DataSource";

@autoInjectable()
export class JSONDataSource<T> implements DataSource<T[]> {
  async read(): Promise<T[]> {
    try {
      const data = await fs.readFile(path.join(__dirname, './targets.json'), {encoding: 'utf8'});
      return JSON.parse(data)
    } catch (err) {
      throw err
    }
  }
}