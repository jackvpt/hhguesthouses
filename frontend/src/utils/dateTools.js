/**
 * Get the ISO week number of a given date.
 * ISO weeks start on Monday, and the first week of the year
 * is the one containing the first Thursday.
 *
 * @param {Date} date - The input date.
 * @returns {number} The ISO week number (1-53).
 */
export function getWeekNumber(date) {
  // Create a UTC copy of the date to avoid timezone issues
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  )

  // Get the day number (Monday=1, Sunday=7)
  const dayNum = d.getUTCDay() || 7

  // Move date to Thursday of current ISO week
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)

  // Get the first day of the year
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))

  // Calculate the week number
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
  return weekNo
}

/**
 * Get the start (Monday) and end (Sunday) dates of the week for a given date.
 *
 * @param {Date} date - Reference date.
 * @returns {{ monday: string, sunday: string }} Object containing ISO strings for Monday and Sunday.
 */
export function getWeekRangeFromDate(date) {
  const ref = new Date(date) // avoid mutating input

  const day = ref.getDay() // Sunday=0, Monday=1, ..., Saturday=6

  // Calculate difference to Monday (ISO standard)
  const diffToMonday = day === 0 ? -6 : 1 - day

  // Compute Monday
  const monday = new Date(ref)
  monday.setDate(ref.getDate() + diffToMonday)

  // Compute Sunday
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)

  return { monday: monday.toISOString(), sunday: sunday.toISOString() }
}

/**
 * Format a date string into "DD/MM" format.
 *
 * @param {string} dateString - Input date string.
 * @returns {string} Formatted date string in "DD/MM" format.
 */
export function formatDateToDDMM(dateString) {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0") // Month is 0-indexed
  return `${day}/${month}`
}

/**
 * Add a number of days to a given date and return the new Date.
 *
 * @param {Date} date - Base date.
 * @param {number} days - Number of days to add (negative for subtraction).
 * @returns {Date} New date after adding days.
 */
export function addDays(date, days) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export const numberOfDaysBetweenTwoDates = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const timeDiff = end - start
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
}

export const equalDates = (date1, date2) => {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}
