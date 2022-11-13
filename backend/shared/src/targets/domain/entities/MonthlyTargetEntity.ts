import {Entity} from "../../common/Entity";

enum Month {
  January = 1,
  February = 2,
  March = 3,
  April = 4,
  May = 5,
  June = 6,
  July = 7,
  August = 8,
  September = 9,
  October = 10,
  November = 11,
  December = 12
}

export interface Args {
  month: number,
  year: number,
  recurringRevenue: number,
  churnRate: number,
  downgradeRate: number,
  upgradeRate: number
}

interface ExposedFields {
  month: Month,
  year: number,
  recurringRevenue: number,
  churnRate: number,
  downgradeRate: number,
  upgradeRate: number
}

const MONTHS_IN_A_QUARTER = 3

export class MonthlyTargetEntity implements Entity<ExposedFields> {
  private readonly month: Month;
  private readonly year: number;
  private readonly recurringRevenue: number;
  private readonly churnRate: number;
  private readonly downgradeRate: number;
  private readonly upgradeRate: number;

  private quarter: number;

  constructor(args: Args) {
    this.recurringRevenue = args.recurringRevenue;
    this.year = args.year;
    this.month = args.month as Month;
    this.churnRate = args.churnRate;
    this.downgradeRate = args.downgradeRate;
    this.upgradeRate = args.upgradeRate;
    this.assignQuarter(args.month)
  }

  isForMonth(month: Month) {
    return this.month === month
  }

  isForQuarter(quarter: number) {
    return this.quarter === quarter
  }

  isForYear(year: number) {
    return this.year === year
  }

  assignQuarter(month: Month) {
    this.quarter = Math.ceil(month / MONTHS_IN_A_QUARTER)
  }

  getFields(): ExposedFields {
    return {
      year: this.year,
      month: this.month,
      churnRate: this.churnRate,
      downgradeRate: this.downgradeRate,
      upgradeRate: this.upgradeRate,
      recurringRevenue: this.recurringRevenue,
    }
  }

}