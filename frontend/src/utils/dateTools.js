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

  return { monday, sunday }
}
