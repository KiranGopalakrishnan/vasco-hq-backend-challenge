import {getMockTarget} from "../../../../../test-utils/get-mock-target";
import {MonthlyTarget} from "../../MonthlyTarget";
import {TeamQuarterlyTarget} from "../TeamQuarterlyTarget";

const allTargets = [
  getMockTarget({month: 1, recurringRevenue: 110000}),
  getMockTarget({month: 2, recurringRevenue: 120000}),
  getMockTarget({month: 3, recurringRevenue: 130000}),
  getMockTarget({month: 4, recurringRevenue: 140000}),
  getMockTarget({month: 5, recurringRevenue: 150000}),
  getMockTarget({month: 6, recurringRevenue: 160000})
].map((target) => new MonthlyTarget(target))

describe('TeamQuarterlyTargetAggregate', () => {
  it('should return acquisition team monthly target for expansion team for a given month', () => {
    const acqTeamMonthlyTarget = new TeamQuarterlyTarget(allTargets, 2, 2022)
    expect(acqTeamMonthlyTarget.getAcquisitionTeamTarget()).toBe(30000)
  })

  it('should return expansion team monthly target for expansion team for a given month', () => {
    const acqTeamMonthlyTarget = new TeamQuarterlyTarget(allTargets, 2, 2022)
    expect(acqTeamMonthlyTarget.getExpansionTeamTarget()).toBe(8400.000000000007)
  })
})