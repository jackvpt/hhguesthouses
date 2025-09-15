/** Imports */
const express = require("express")
const router = express.Router()
// const auth = require("../middleware/auth")
const multer = require("multer")
const occupanciesCtrl = require("../controllers/occupancies")

/** Set routes */
router.get("/", occupanciesCtrl.getAllOccupancies)
router.post("/",multer().none(), occupanciesCtrl.createOccupancy)
router.delete("/:id", occupanciesCtrl.deleteOccupancy)
router.put("/:id",multer().none(), occupanciesCtrl.updateOccupancy)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Occupancies
 *   description: Manage guest house occupancies
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Occupancy:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64f0c0e8a1b2c3d4e5f67890
 *         occupantCode:
 *           type: string
 *           example: JD123
 *         house:
 *           type: string
 *           example: Sunrise Villa
 *         room:
 *           type: string
 *           example: Room 101
 *         arrivalDate:
 *           type: string
 *           format: date
 *           example: 2025-09-20
 *         departureDate:
 *           type: string
 *           format: date
 *           example: 2025-09-25
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-09-15T10:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-09-15T10:00:00.000Z
 */

/**
 * @swagger
 * /occupancies:
 *   get:
 *     summary: Get all occupancies
 *     tags: [Occupancies]
 *     responses:
 *       200:
 *         description: List of all occupancies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Occupancy'
 *       400:
 *         description: Error retrieving occupancies
 */

/**
 * @swagger
 * /occupancies:
 *   post:
 *     summary: Create a new occupancy
 *     tags: [Occupancies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Occupancy'
 *     responses:
 *       201:
 *         description: Occupancy created successfully
 *       400:
 *         description: Error adding occupancy
 */

/**
 * @swagger
 * /occupancies/{id}:
 *   put:
 *     summary: Update an existing occupancy
 *     tags: [Occupancies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Occupancy ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Occupancy'
 *     responses:
 *       200:
 *         description: Occupancy updated successfully
 *       401:
 *         description: Error updating occupancy
 *       404:
 *         description: Occupancy not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /occupancies/{id}:
 *   delete:
 *     summary: Delete an occupancy
 *     tags: [Occupancies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Occupancy ID to delete
 *     responses:
 *       200:
 *         description: Occupancy deleted successfully
 *       404:
 *         description: Occupancy not found
 *       500:
 *         description: Error deleting occupancy
 */
