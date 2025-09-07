const Log = require("../models/Log")

async function createLog(email, action, remarks) {
  try {
    await Log.create({ email, action, remarks })
  } catch (err) {
    console.error("Erreur lors de la création du log :", err.message)
  }
}

module.exports = createLog
