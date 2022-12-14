import {Entity} from "../../common/Entity";
import {Quarter} from "../../common/Quarter";
import {TargetList} from "../data-structures/TargetList";
import {AverageRecurringRevenueFormula} from "../formulas/AverageRecurringRevenueFormula";
import {QuarterlyAmountFormula, RateType} from "../formulas/QuarterlyAmountFormula";
import {QuarterlyRateFormula} from "../formulas/QuarterlyRateFormula";
import {MonthlyTarget} from "./MonthlyTarget";

export interface QuarterlyEntityExposedFields {
  quarter: number
  year: number
  recurringRevenue: number
  churnRate: number
  downgradeRate: number
  upgradeRate: number
}

export class QuarterlyTarget implements Entity<QuarterlyEntityExposedFields> {
  private targets: TargetList = new TargetList()
  private readonly quarter!: Quarter
  private readonly year!: number
  private lastMonthRevenueForQuarter: number = 0
  private readonly targetsForQuarter: MonthlyTarget[] = []

  constructor(targets: MonthlyTarget[] = [], currentQuarter: number, year: number) {
    this.targets = new TargetList(targets);
    this.quarter = new Quarter(currentQuarter, year);
    this.year = year;

    this.targetsForQuarter = this.targets.findTargetsForQuarter(currentQuarter, year)
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

  isValid() {
    return !!this.targetsForQuarter.length
  }


  private getRateForType(rateType: RateType) {
    const previousAdjacentMonthTarget = this.getAdjacentPreviousMonthTarget()
    //TODO: Throw useful error
    // Maybe useful to create DomainError or BusinessError class for these type of errors ?
    if (!previousAdjacentMonthTarget) throw new Error('No previous month found for target')
    const quarterlyAmountCalculator = new QuarterlyAmountFormula(
      new TargetList(this.targetsForQuarter),
      previousAdjacentMonthTarget,
      rateType
    )
    const avgRecRevenueCalculator = new AverageRecurringRevenueFormula(this.targetsForQuarter)
    return new QuarterlyRateFormula(quarterlyAmountCalculator, avgRecRevenueCalculator).calculate()
  }

  private calculateLastMonthRevenueInQuarter() {
    const lastMonthInQuarter = this.quarter.getLastMonth()
    const targetForLastMonth = this.targets.findTargetForMonth(lastMonthInQuarter, this.year)
    this.lastMonthRevenueForQuarter = targetForLastMonth?.getFields().recurringRevenue || 0
  }

  private getAdjacentPreviousMonthTarget() {
    const {month, year} = this.quarter.getAdjacentPreviousMonthAndYear()
    return this.targets.findTargetForMonth(month, year)
  }
}