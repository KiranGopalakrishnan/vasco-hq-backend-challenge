import {getMockTarget} from "../../../../../test-utils/get-mock-target";
import {MonthlyTargetEntity} from "../../MonthlyTargetEntity";
import {AcquisitionTeamMonthlyTargetEntity} from "../AcquisitionTeamMonthlyTargetEntity";


describe('AcquisitionTeamMonthlyTargetEntityTest', () => {
  const currentMonthTarget = new MonthlyTargetEntity(getMockTarget({month: 3, recurringRevenue: 170000}))
  const previousMonthTarget = new MonthlyTargetEntity(getMockTarget({month: 2, recurringRevenue: 160000}))
  it('should return monthly target for acquisition team', () => {
    const acqTeamMonthlyTarget = new AcquisitionTeamMonthlyTargetEntity(currentMonthTarget, previousMonthTarget)
    expect(acqTeamMonthlyTarget.getTarget()).toBe(10000)
  })
})