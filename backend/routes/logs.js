/** Imports */
const express = require("express")
const router = express.Router()
const logsCtrl = require("../controllers/logs")

/** Set routes */
router.get("/", logsCtrl.getAllLogs)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: Logs of user actions
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Log:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64f0c0e8a1b2c3d4e5f67890
 *         email:
 *           type: string
 *           example: john@example.com
 *         action:
 *           type: string
 *           example: Logged in
 *         remarks:
 *           type: string
 *           example: Successful login
 *         date:
 *           type: string
 *           format: date-time
 *           example: 2025-09-15T10:00:00.000Z
 */

/**
 * @swagger
 * /logs:
 *   get:
 *     summary: Retrieve all logs
 *     tags: [Logs]
 *     responses:
 *       200:
 *         description: List of all logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Log'
 *       400:
 *         description: Error retrieving logs
 */
