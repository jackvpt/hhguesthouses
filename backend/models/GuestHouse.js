/** Import mongoose */
const mongoose = require("mongoose")

/** Create a mongoose Schema */
const guestHouseSchema = mongoose.Schema({
  name: { type: String, required: true },
  rooms: [
    {
      name: { type: String, required: true },
      description: [
        {
          language: { type: String, required: true },
          text: { type: String, required: true }
        }
      ]
    }
  ]
})

/** Model methods converts Schema in usable model */
module.exports = mongoose.model(
  "GuestHouse",
  guestHouseSchema
) /** 'GuestHouse' is the collection name which becomes 'GuestHouses' */
