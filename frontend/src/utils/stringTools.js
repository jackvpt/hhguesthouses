/**
 * Convert a user role string to a more readable format.
 * * @example
 * convertRole("admin") // returns "Admin"
 * convertRole("guest") // returns "Guest"
 * convertRole("superAdmin") // returns "Super Admin"
 * convertRole("unknown") // returns ""
 * @param {String} role
 * @returns {String}
 */
export function convertRole(role) {
  const roles = {
    "guest": "Guest",
    "manager": "Manager",
    "admin": "Admin",
    "super-admin": "Super Admin",
  }
  return roles[role] || ""
}