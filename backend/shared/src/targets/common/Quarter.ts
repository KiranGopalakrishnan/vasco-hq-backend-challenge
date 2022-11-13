const MONTHS_IN_A_QUARTER = 3
const FIRST_MONTH_IN_YEAR = 1
const LAST_MONTH_IN_YEAR = 12

export class Quarter {
  quarter: number
  year: number

  constructor(quarter: number, year: number) {
    this.quarter = quarter
    this.year = year
  }


  getQuarter() {
    return this.quarter
  }

  getLastMonth() {
    return this.quarter * MONTHS_IN_A_QUARTER
  }

  getFirstMonth() {
    return (this.quarter * MONTHS_IN_A_QUARTER - (MONTHS_IN_A_QUARTER - 1))
  }

  getAdjacentPreviousMonthAndYear() {
    const firstMonthInQuarter = this.getFirstMonth()
    if (this.quarter === 1) {
      return {
        month: LAST_MONTH_IN_YEAR,
        year: this.year - 1
      }
    }

    return {
      month: firstMonthInQuarter - 1,
      year: this.year
    }
  }

  getMonthsInQuarter() {
    const first = this.getFirstMonth()
    const second = first + 1
    const third = second + 1
    return [first, second, third]
  }
}