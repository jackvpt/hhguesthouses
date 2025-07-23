/** Import mongoose */
const mongoose = require("mongoose")

/** Create a mongoose Schema */
const OccupancySchema = mongoose.Schema({
  occupantCode: { type: String, required: true },
  house: { type: String, required: true },
  room: { type: String, required: true },
  arrivalDate: { type: Date, required: true },
  departureDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

/** Model methods converts Schema in usable model */
module.exports = mongoose.model(
  "Occupancy",
  OccupancySchema
) /** 'Occupancy' is the collection name which becomes 'Occupancies' */
