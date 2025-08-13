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
