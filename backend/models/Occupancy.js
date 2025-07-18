/** Import mongoose */
const mongoose = require("mongoose")

/** Create a mongoose Schema */
const OccupancySchema = mongoose.Schema({
  OccupantCode: { type: String, required: true },
  house: { type: String, required: true },
  room: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
})

/** Model methods converts Schema in usable model */
module.exports = mongoose.model(
  "Occupancy",
  OccupancySchema
) /** 'Occupancy' is the collection name which becomes 'Occupancies' */
