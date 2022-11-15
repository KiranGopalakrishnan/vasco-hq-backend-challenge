import {getMockTarget} from "../../../../test-utils/get-mock-target";
import {MonthlyTargetEntity} from "../MonthlyTargetEntity";
import {QuarterlyTargetAggregate} from "../QuarterlyTargetAggregate";

const allTargets = [
  getMockTarget({month: 1, recurringRevenue: 110000}),
  getMockTarget({month: 2, recurringRevenue: 120000}),
  getMockTarget({month: 3, recurringRevenue: 130000}),
  getMockTarget({month: 4, recurringRevenue: 140000}),
  getMockTarget({month: 5, recurringRevenue: 150000}),
  getMockTarget({month: 6, recurringRevenue: 160000})
].map((target) => new MonthlyTargetEntity(target))

describe('QuarterlyTargetAggregateTest', () => {
  it('Should return quarterly churn rate for a given quarter', () => {
    const quarterlyAggregate = new QuarterlyTargetAggregate(allTargets, 2, 2022)
    expect(quarterlyAggregate.getQuarterlyChurnRate()).toBe(0.028)
  })

  it('Should return quarterly downgrade rate for a given quarter', () => {
    const quarterlyAggregate = new QuarterlyTargetAggregate(allTargets, 2, 2022)
    expect(quarterlyAggregate.getQuarterlyDowngradeRate()).toBe(0.084)
  })

  it('Should return quarterly upgrade rate for a given quarter', () => {
    const quarterlyAggregate = new QuarterlyTargetAggregate(allTargets, 2, 2022)
    expect(quarterlyAggregate.getQuarterlyUpgradeRate()).toBe(0.056)
  })
})