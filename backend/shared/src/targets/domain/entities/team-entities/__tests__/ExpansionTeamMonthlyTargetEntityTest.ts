import {getMockTarget} from "../../../../../test-utils/get-mock-target";
import {MonthlyTargetEntity} from "../../MonthlyTargetEntity";
import {ExpansionTeamMonthlyTargetEntity} from "../ExpansionTeamMonthlyTargetEntity";

describe('ExpansionTeamMonthlyTargetEntityTest', () => {

  const currentMonthTarget = new MonthlyTargetEntity(getMockTarget({month: 3, recurringRevenue: 170000}))
  const previousMonthTarget = new MonthlyTargetEntity(getMockTarget({month: 2, recurringRevenue: 160000}))

  it('should return monthly target for expansion team', () => {
    const acqTeamMonthlyTarget = new ExpansionTeamMonthlyTargetEntity(currentMonthTarget, previousMonthTarget)
    expect(acqTeamMonthlyTarget.getTarget()).toBe(3200.0000000000027)
  })
})