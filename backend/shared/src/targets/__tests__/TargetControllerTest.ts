import {TRPCError} from "@trpc/server";
import "reflect-metadata"
import {container} from "tsyringe";
import {HttpErrorCode} from "../../utils/HttpError";
import {TargetController} from "../TargetController";
import {PerMonthDTO} from "../view/per-month/PerMonthDTO";
import {PerQuarterDTO} from "../view/per-quarter/PerQuarterDTO";
import {TeamQuarterlyTargetDTO} from "../view/per-quarter/team/TeamQuarterlyTargetDTO";

const quarterBadRequestError = new TRPCError({code: HttpErrorCode.BAD_REQUEST, message: 'Quarter must be valid'})
const monthBadRequestError = new TRPCError({code: HttpErrorCode.BAD_REQUEST, message: 'Month must be valid'})
describe('TargetControllerTest', () => {
  describe('getTargetsPerQuarter', () => {
    it('Should throw if quarter is greater than 4 ', () => {
      const controller = container.resolve(TargetController)
      expect(controller.getTargetsPerQuarter(5, 2022)).rejects.toThrowError(quarterBadRequestError)
    })

    it('Should throw if quarter is less than 1 ', () => {
      const controller = container.resolve(TargetController)
      expect(controller.getTargetsPerQuarter(0, 2022)).rejects.toThrowError(quarterBadRequestError)
    })

    it('Should get targets for quarter', async () => {
      const controller = container.resolve(TargetController)
      await expect(controller.getTargetsPerQuarter(2, 2022)).resolves.toStrictEqual(new PerQuarterDTO({
        "churnRate": 0.028,
        "downgradeRate": 0.085,
        "quarter": 2,
        "recurringRevenue": 145000,
        "upgradeRate": 0.056,
        "year": 2022
      }))
    })
  })

  describe('getTargetsPerMonthForYear', () => {
    it('Should throw if month is less than 1 ', async () => {
      const controller = container.resolve(TargetController)
      await expect(controller.getTargetsPerMonthForYear(0, 2022)).rejects.toThrowError(monthBadRequestError)
    })

    it('Should throw if month is greater than 12', async () => {
      const controller = container.resolve(TargetController)
      await expect(controller.getTargetsPerMonthForYear(13, 2022)).rejects.toThrowError(monthBadRequestError)
    })

    it('Should get targets for specified month', async () => {
      const controller = container.resolve(TargetController)
      await expect(controller.getTargetsPerMonthForYear(1, 2022)).resolves.toStrictEqual(new PerMonthDTO({
        "churnRate": 0.01,
        "downgradeRate": 0.03,
        "month": 1,
        "recurringRevenue": 105000,
        "upgradeRate": 0.02,
        "year": 2022
      }))
    })
  })

  describe('getTeamTargetsPerQuarter', () => {
    it('Should throw if quarter is less than 1 ', async () => {
      const controller = container.resolve(TargetController)
      await expect(controller.getTeamTargetsPerQuarter(0, 2022)).rejects.toThrowError(quarterBadRequestError)
    })

    it('Should throw if quarter is greater than 4', async () => {
      const controller = container.resolve(TargetController)
      await expect(controller.getTeamTargetsPerQuarter(5, 2022)).rejects.toThrowError(quarterBadRequestError)
    })

    it('Should get targets for specified quarter for teams', async () => {
      const controller = container.resolve(TargetController)
      await expect(controller.getTeamTargetsPerQuarter(1, 2022)).resolves.toStrictEqual(new TeamQuarterlyTargetDTO({
        "acquisitionTarget": 20000,
        "churnRate": 0.028,
        "downgradeRate": 0.085,
        "expansionTarget": 6300,
        "quarter": 1,
        "recurringRevenue": 120000,
        "upgradeRate": 0.056,
        "year": 2022
      }))
    })
  })

  describe('getTeamTargetsPerMonthForYear', () => {
    it('Should throw if month is less than 1 ', async () => {
      const controller = container.resolve(TargetController)
      await expect(controller.getTeamTargetsPerMonthForYear(0, 2022)).rejects.toThrowError(monthBadRequestError)
    })

    it('Should throw if month is greater than 12', async () => {
      const controller = container.resolve(TargetController)
      await expect(controller.getTargetsPerMonthForYear(13, 2022)).rejects.toThrowError(monthBadRequestError)
    })

    it('Should get targets for specified month for teams', async () => {
      const controller = container.resolve(TargetController)
      await expect(controller.getTeamTargetsPerQuarter(1, 2022)).resolves.toStrictEqual(new TeamQuarterlyTargetDTO({
        "acquisitionTarget": 20000,
        "churnRate": 0.028,
        "downgradeRate": 0.085,
        "expansionTarget": 6300,
        "quarter": 1,
        "recurringRevenue": 120000,
        "upgradeRate": 0.056,
        "year": 2022
      }))
    })
  })
})