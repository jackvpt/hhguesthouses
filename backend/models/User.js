/** Import mongoose */
const mongoose = require("mongoose")

/** Create a mongoose Schema */
const UserSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  code: { type: String, required: true, unique: true },
})

/** Model methods converts Schema in usable model */
module.exports = mongoose.model(
  "User",
  UserSchema
) /** 'User' is the collection name which becomes 'Users' */
