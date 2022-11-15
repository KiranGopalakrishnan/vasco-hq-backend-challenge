import {getMockTarget} from "../../../../test-utils/get-mock-target";
import {MonthlyTargetEntity} from "../MonthlyTargetEntity";


describe('MonthlyTargetEntityTest', () => {

  describe('isForMonth', () => {
    it('Should return true if target is for a provided month', () => {
      const mockTarget = getMockTarget({month: 2})
      expect(new MonthlyTargetEntity(mockTarget).isForMonth(2)).toBe(true)
    })

    it('Should return false if target is for a provided month', () => {
      const mockTarget = getMockTarget({month: 2})
      expect(new MonthlyTargetEntity(mockTarget).isForMonth(3)).toBe(false)
    })
  })

  describe('isForQuarter', () => {
    it('Should return true if target is within a provided quarter', () => {
      const mockTarget = getMockTarget({month: 2})
      expect(new MonthlyTargetEntity(mockTarget).isForQuarter(1)).toBe(true)
    })
    it('Should return false if target is within a provided quarter', () => {
      const mockTarget = getMockTarget({month: 2})
      expect(new MonthlyTargetEntity(mockTarget).isForQuarter(2)).toBe(false)
    })
  })

  describe('isForYear', () => {
    it('Should return true if target is within a provided year', () => {
      const mockTarget = getMockTarget({year: 2022})
      expect(new MonthlyTargetEntity(mockTarget).isForYear(2022)).toBe(true)
    })
    it('Should return false if target is within a provided quarter', () => {
      const mockTarget = getMockTarget({year: 2021})
      expect(new MonthlyTargetEntity(mockTarget).isForYear(2022)).toBe(false)
    })
  })

  describe('isForYear', () => {
    it('Should return true if target is within a provided year', () => {
      const mockTarget = getMockTarget({year: 2022})
      expect(new MonthlyTargetEntity(mockTarget).isForYear(2022)).toBe(true)
    })
    it('Should return false if target is within a provided quarter', () => {
      const mockTarget = getMockTarget({year: 2021})
      expect(new MonthlyTargetEntity(mockTarget).isForYear(2022)).toBe(false)
    })
  })

  describe('getNetRetentionRevenue', () => {
    it('net retention revenue should be 1 - downgradeRate/100 + upgradeRate/100 - churnRate/100', () => {
      const mockTarget = getMockTarget({year: 2022})
      const expectedNrr = 1 - mockTarget.downgradeRate / 100 + mockTarget.upgradeRate / 100 - mockTarget.churnRate / 100
      expect(new MonthlyTargetEntity(mockTarget).getNetRetentionRevenue()).toBe(expectedNrr)
    })
  })

  describe('getNetRetentionRevenue', () => {
    it('net retention revenue should be 1 - downgradeRate + upgradeRate - churnRate', () => {
      const mockTarget = getMockTarget({year: 2022})
      const expectedNrr = 1 - mockTarget.downgradeRate / 100 + mockTarget.upgradeRate / 100 - mockTarget.churnRate / 100
      expect(new MonthlyTargetEntity(mockTarget).getNetRetentionRevenue()).toBe(expectedNrr)
    })
  })
})