import {Entity} from "../../common/Entity";
import {Quarter} from "../../common/Quarter";
import {AverageRecurringRevenueCalculator} from "../formulaes/AverageRecurringRevenueCalculator";
import {QuarterlyAmountCalculator, RateType} from "../formulaes/QuarterlyAmountCalculator";
import {QuarterlyRateCalculator} from "../formulaes/QuarterlyRateCalculator";
import {MonthlyTargetEntity} from "./MonthlyTargetEntity";


const PREVIOUS_YEAR = 2021
const PREVIOUS_YEAR_RECURRING_REVENUE = 100000

interface ExposedFields {
  quarter: number
  year: number
  recurringRevenue: number
  churnRate: number
  downgradeRate: number
  upgradeRate: number
}

/* QuarterlyTargetEntity here is an aggregate root , and acts over multiple monthly targets within a quarter */

export class QuarterlyTargetEntity implements Entity<ExposedFields> {
  private targets: MonthlyTargetEntity[] = []
  private readonly quarter!: Quarter
  private readonly year!: number
  private lastMonthRevenueForQuarter: number = 0
  private readonly targetsForQuarter: MonthlyTargetEntity[] = []

  constructor(targets: MonthlyTargetEntity[] = [], currentQuarter: number, year: number) {
    this.targets = targets;
    this.quarter = new Quarter(currentQuarter, year);
    this.year = year;

    this.targetsForQuarter = this.findAllTargetsForQuarter()
    this.calculateLastMonthRevenueInQuarter()
  }

  getFields() {
    return {
      quarter: this.quarter.getQuarter(),
      year: this.year,
      recurringRevenue: this.lastMonthRevenueForQuarter,
      churnRate: this.getQuarterlyChurnRate(),
      downgradeRate: this.getQuarterlyDowngradeRate(),
      upgradeRate: this.getQuarterlyUpgradeRate()
    }
  }

  getQuarterlyChurnRate() {
    return this.getRateForType(RateType.CHURN_RATE)
  }

  getQuarterlyUpgradeRate() {
    return this.getRateForType(RateType.UPGRADE_RATE)
  }

  getQuarterlyDowngradeRate() {
    return this.getRateForType(RateType.DOWNGRADE_RATE)
  }


  private getRateForType(rateType: RateType) {
    const previousAdjacentMonthTarget = this.getAdjacentPreviousMonthTarget()
    if (!previousAdjacentMonthTarget) throw new Error('No previous month found for target')
    const quarterlyAmountCalculator = new QuarterlyAmountCalculator(
      this.targetsForQuarter,
      previousAdjacentMonthTarget,
      rateType
    )
    const avgRecRevenueCalculator = new AverageRecurringRevenueCalculator(this.targetsForQuarter)
    return new QuarterlyRateCalculator(quarterlyAmountCalculator, avgRecRevenueCalculator).calculate()
  }

  private calculateLastMonthRevenueInQuarter() {
    const lastMonthInQuarter = this.quarter.getLastMonth()
    const targetForLastMonth = this.findTargetForMonth(lastMonthInQuarter, this.year)
    this.lastMonthRevenueForQuarter = targetForLastMonth?.getFields().recurringRevenue || 0
  }

  private getAdjacentPreviousMonthTarget() {
    const {month, year} = this.quarter.getAdjacentPreviousMonthAndYear()
    if (year === PREVIOUS_YEAR) {
      return new MonthlyTargetEntity({
        month,
        year,
        recurringRevenue: PREVIOUS_YEAR_RECURRING_REVENUE,
        churnRate: 0,
        downgradeRate: 0,
        upgradeRate: 0
      })
    }

    return this.findTargetForMonth(month, year)
  }

  private findAllTargetsForQuarter() {
    return this.targets.filter(target => target.isForQuarter(this.quarter.getQuarter()) && target.isForYear(this.year))
  }

  private findTargetForMonth(month: number, year: number) {
    return this.targets.find(target => target.isForMonth(month) && target.isForYear(year))
  }
}