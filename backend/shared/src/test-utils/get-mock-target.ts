export const getMockTarget = (data: Partial<Record<string, number>> = {}) => (
  {
    "month": 8,
    "year": 2022,
    "recurringRevenue": 160000,
    "churnRate": 1,
    "downgradeRate": 3,
    "upgradeRate": 2,
    ...data
  }
)