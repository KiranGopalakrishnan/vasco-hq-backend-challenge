import {MonthlyTargetEntity} from "../entities/MonthlyTargetEntity";

const PREVIOUS_YEAR_RECURRING_REVENUE = 100000
const PREVIOUS_YEAR_LAST_MONTH = 12
const PREVIOUS_YEAR = 2021

// Maybe a doubly linked list is more appropriate here
// But , since we don't have the requirement for it , implementing bare necessities here

// This list assumes that the target list has only one entry for a month
// Even though this might not be the case always , it seems like it from the data

//TODO: Create a generic List interface to be implemented here and replace type references to the abstraction rather than concretion
export class TargetList {
  private readonly list: MonthlyTargetEntity[] = []

  constructor(list: MonthlyTargetEntity[] = []) {
    this.list = this.sortByMonthAndYear(list)
  }

  findTargetForMonth(month: number, year: number): MonthlyTargetEntity | null {
    if (month === PREVIOUS_YEAR_LAST_MONTH && year === PREVIOUS_YEAR) {
      return this.getPreviousYearEndTarget()
    }
    const index = this.list.findIndex(target => target.isForMonth(month) && target.isForYear(year))
    const targetForMonth = this.list[index]
    if (!targetForMonth) return null
    return targetForMonth
  }

  // Unsure of this method doing a m - 1 on current month , it's not obvious
  // TODO: Refactor
  getPreviousMonth(currentMonth: number, year: number): MonthlyTargetEntity {
    const prevMonth = currentMonth - 1
    if (prevMonth < 1) {
      return this.getPreviousYearEndTarget()
    }
    const prevMonthTarget = this.findTargetForMonth(prevMonth, year)
    if (!prevMonthTarget) throw Error('Could not find previous month target')
    return prevMonthTarget
  }

  //I am unsure if this truly belongs in this class
  // This might be an important detail that's hidden in this class and is not obvious
  // TODO: Refactor
  getPreviousYearEndTarget() {
    return new MonthlyTargetEntity({
      month: 12,
      year: 2021,
      recurringRevenue: PREVIOUS_YEAR_RECURRING_REVENUE,
      churnRate: 0,
      downgradeRate: 0,
      upgradeRate: 0
    })
  }

  findTargetsForQuarter(quarter: number, year: number): MonthlyTargetEntity[] {
    return this.list.filter(target => target.isForQuarter(quarter) && target.isForYear(year))
  }

  getAsArray(): MonthlyTargetEntity[] {
    return this.list
  }

  getTargetAtIndex(index: number) {
    return this.list[index]
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