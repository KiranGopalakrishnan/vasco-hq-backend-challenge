import {getMockTarget} from "../../../../../test-utils/get-mock-target";
import {MonthlyTarget} from "../../MonthlyTarget";
import {AcquisitionTeamMonthlyTarget} from "../AcquisitionTeamMonthlyTarget";


describe('AcquisitionTeamMonthlyTargetEntityTest', () => {
  const currentMonthTarget = new MonthlyTarget(getMockTarget({month: 3, recurringRevenue: 170000}))
  const previousMonthTarget = new MonthlyTarget(getMockTarget({month: 2, recurringRevenue: 160000}))
  it('should return monthly target for acquisition team', () => {
    const acqTeamMonthlyTarget = new AcquisitionTeamMonthlyTarget(currentMonthTarget, previousMonthTarget)
    expect(acqTeamMonthlyTarget.getTarget()).toBe(10000)
  })
})