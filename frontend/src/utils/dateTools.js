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
 * Get the start (Monday) and end (Sunday) dates of the week for a given date.
 * @param {Date} date - The reference date
 * @returns {{ monday: Date, sunday: Date }}
 */
export function getWeekRangeFromDate(date) {
  const ref = new Date(date) // copy to avoid mutating input

  const day = ref.getDay() // Sunday=0, Monday=1, ..., Saturday=6

  // Calculate the difference to Monday (ISO: Monday is the first day)
  const diffToMonday = day === 0 ? -6 : 1 - day

  const monday = new Date(ref)
  monday.setDate(ref.getDate() + diffToMonday)

  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)

  return { monday: monday.toISOString(), sunday: sunday.toISOString() }
}

/**
 * Convert a date string to a formatted string in "DD/MM" format.
 * @param {String} dateString
 * @returns {String}
 */
export function formatDateToDDMM(dateString) {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0") // Mois de 0 à 11
  return `${day}/${month}`
}

/**
 * Add a number of days to a given date and return the new Date.
 * @param {Date} date - The base date
 * @param {number} days - Number of days to add (can be negative)
 * @returns {Date}
 */
export function addDays(date, days) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}
