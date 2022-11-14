import {MonthlyTargetEntity} from "../entities/MonthlyTargetEntity";

const PREVIOUS_YEAR_RECURRING_REVENUE = 100000

// Maybe a doubly linked list is more appropriate here
// But , since we don't have the requirement for it just yet , implementing bare neccessities here

// This list assumes that the target list has only one entry for a month
// Even though this might not be the case always , it seems like it from the data
export class TargetList {
  private readonly list: MonthlyTargetEntity[] = []
  private currentIndex = 0

  constructor(list: MonthlyTargetEntity[] = []) {
    this.list = this.sortByMonthAndYear(list)
  }

  findTargetForMonth(month: number, year: number): MonthlyTargetEntity {
    const index = this.list.findIndex(target => target.isForMonth(month) && target.isForYear(year))
    this.currentIndex = index
    return this.list[index]
  }

  getPreviousMonth(month: number, year: number): MonthlyTargetEntity {
    const prevMonth = month - 1
    if (prevMonth < 1) {
      return new MonthlyTargetEntity({
        month: 12,
        year: 2021,
        recurringRevenue: PREVIOUS_YEAR_RECURRING_REVENUE,
        churnRate: 0,
        downgradeRate: 0,
        upgradeRate: 0
      })
    }
    const prevMonthTarget = this.findTargetForMonth(prevMonth, year)
    if (!prevMonthTarget) throw Error('Could not find previous month target')
    return prevMonthTarget
  }

  findTargetsForQuarter(quarter: number, year: number): MonthlyTargetEntity[] {
    return this.list.filter(target => target.isForQuarter(quarter) && target.isForYear(year))
  }

  getAsArray(): MonthlyTargetEntity[] {
    return this.list
  }

  private sortByMonthAndYear(list: MonthlyTargetEntity[]): MonthlyTargetEntity[] {
    return [...list].sort((a, b) => {
      return (
        a.getFields().year - b.getFields().year ||
        a.getFields().month - b.getFields().month
      )
    })
  }
}