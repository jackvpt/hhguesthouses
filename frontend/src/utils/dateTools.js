/**
 * Utility function to get the ISO week number of a given date.
 * The week starts on Monday and the first week of the year is the one containing the first Thursday.
 * @param {Date} date 
 * @returns 
 */
export function getWeekNumber(date) {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  )
  const dayNum = d.getUTCDay() || 7 // dimanche = 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum) // se placer au jeudi de la semaine ISO
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
  return weekNo
}

/**
 * Get the start and end dates of the week for a given week number and year.
 * @param {Number} weekNumber 
 * @param {Number} year 
 * @returns {Object} An object containing the start (Monday) and end (Sunday) dates of the week.
 * The dates are in the local timezone.
 */
export function getWeekRangeFromWeekNumber(weekNumber, year) {
  const simple = new Date(year, 0, 4)

  const dayOfWeek = simple.getDay() || 7

  const mondayOfWeek1 = new Date(simple)
  mondayOfWeek1.setDate(simple.getDate() - dayOfWeek + 1)

  const monday = new Date(mondayOfWeek1)
  monday.setDate(mondayOfWeek1.getDate() + (weekNumber - 1) * 7)

  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)

  return { monday, sunday }
}
