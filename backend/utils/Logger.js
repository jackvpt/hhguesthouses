const Log = require("../models/Log")

async function createLog(email, action, remarks) {
  try {
    if (action === "Token validated") {
      const lastLog = await Log.findOne({ email }).sort({ date: -1 }).lean()
      if (lastLog && lastLog.action === "Token validated") {
        
        let match = lastLog.remarks?.match(/\(x(\d+)\)$/)
        let count = match ? parseInt(match[1], 10) + 1 : 2

      
        await Log.findByIdAndUpdate(lastLog._id, {
          remarks: `(x${count})`.trim(),
        })

        return
      }
    }

    await Log.create({ email, action, remarks })
  } catch (err) {
    console.error("Error while creating log:", err.message)
  }
}

module.exports = createLog
