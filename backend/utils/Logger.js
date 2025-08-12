const Log = require("../models/Log");

async function createLog(email, action) {
  try {
    await Log.create({ email, action });
  } catch (err) {
    console.error("Erreur lors de la création du log :", err.message);
  }
}

module.exports = createLog;
