/**
 * Convert a user role string into a more human-readable format.
 * If the role is not recognized, an empty string is returned.
 *
 * @param {string} role - The role string to convert (e.g., "admin", "guest").
 * @returns {string} Human-readable role string.
 *
 * @example
 * convertRole("admin") // returns "Admin"
 * convertRole("guest") // returns "Guest"
 * convertRole("super-admin") // returns "Super Admin"
 * convertRole("unknown") // returns ""
 */
export function convertRole(role) {
  // Mapping of role keys to readable names
  const roles = {
    guest: "Guest",
    manager: "Manager",
    admin: "Admin",
    "super-admin": "Super Admin",
    "special-guest": "Special Guest",
  }

  // Return the mapped role, or empty string if not found
  return roles[role] || ""
}

/**
 * Capitalize the first letter of a string.
 *
 * @param {string} text - Input text.
 * @returns {string} Text with first letter capitalized.
 * @example
 * capitalize("hello") // returns "Hello"
 */
export function capitalize(text) {
  if (!text) return ""
  return text.charAt(0).toUpperCase() + text.slice(1)
}

