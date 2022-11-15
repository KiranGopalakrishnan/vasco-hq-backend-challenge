import {getMockTarget} from "../../../../../test-utils/get-mock-target";
import {MonthlyTarget} from "../../MonthlyTarget";
import {ExpansionTeamMonthlyTarget} from "../ExpansionTeamMonthlyTarget";

describe('ExpansionTeamMonthlyTargetEntityTest', () => {

  const currentMonthTarget = new MonthlyTarget(getMockTarget({month: 3, recurringRevenue: 170000}))
  const previousMonthTarget = new MonthlyTarget(getMockTarget({month: 2, recurringRevenue: 160000}))

  it('should return monthly target for expansion team', () => {
    const acqTeamMonthlyTarget = new ExpansionTeamMonthlyTarget(currentMonthTarget, previousMonthTarget)
    expect(acqTeamMonthlyTarget.getTarget()).toBe(3200.0000000000027)
  })
})