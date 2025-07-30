/** Import mongoose */
const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

/** Create a mongoose Schema */
const UserSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  codeName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  privileges: { type: String, default: "guest" }, // e.g., "guest", "manager", "admin", "superAdmin"
  createdAt: { type: Date, default: Date.now },
})

/** Check if Schema is unique */
UserSchema.plugin(uniqueValidator)

/** Model methods converts Schema in usable model */
module.exports = mongoose.model(
  "User",
  UserSchema
) /** 'User' is the collection name which becomes 'Users' */
