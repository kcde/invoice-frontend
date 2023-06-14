export function compareDate(date1: Date, date2: Date): boolean {
  const date1Year = date1.getFullYear()
  const date1Month = date1.getMonth()
  const date1Date = date1.getDate()

  const date2Year = date2.getFullYear()
  const date2Month = date2.getMonth()
  const date2Date = date2.getDate()

  if (date1Year == date2Year && date1Month == date2Month && date1Date == date2Date) {
    return true
  }

  return false
}

export function subtractDaysFromDate(date: Date, numberOfDaysToSubtract: number) {
  //convert date string to a date Object
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + Number(numberOfDaysToSubtract))
  return newDate
}

export const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions) => {
  return date.toLocaleString(
    'default',
    options || {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  )
}

export const formatPrice = (num: number) => {
  return Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(num)
}
