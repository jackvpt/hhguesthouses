// swagger/occupancies.js

module.exports = {
  paths: {
    "/occupancies": {
      get: {
        summary: "Retrieve all occupancies",
        tags: ["Occupancies"],
        responses: {
          200: {
            description: "List of occupancies",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Occupancy" }
                }
              }
            }
          },
          400: {
            description: "Error retrieving occupancies",
            content: {
              "application/json": {
                example: { error: "Error retrieving occupancies." }
              }
            }
          }
        }
      },
      post: {
        summary: "Create a new occupancy",
        tags: ["Occupancies"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/OccupancyInput" }
            }
          }
        },
        responses: {
          201: {
            description: "Occupancy created successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Occupancy" }
              }
            }
          },
          400: { description: "Error adding occupancy" }
        }
      }
    },
    "/occupancies/{id}": {
      put: {
        summary: "Update an existing occupancy",
        tags: ["Occupancies"],
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "string" } }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/OccupancyInput" }
            }
          }
        },
        responses: {
          200: {
            description: "Occupancy updated successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Occupancy" }
              }
            }
          },
          401: { description: "Error updating occupancy" }
        }
      },
      delete: {
        summary: "Delete an occupancy",
        tags: ["Occupancies"],
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "string" } }
        ],
        responses: {
          200: { description: "Occupancy deleted successfully" },
          500: { description: "Error deleting occupancy" }
        }
      }
    }
  },
  components: {
    schemas: {
      Occupancy: {
        type: "object",
        properties: {
          _id: { type: "string", example: "64f0c0e8a1b2c3d4e5f67890" },
          occupantCode: { type: "string", example: "JD123" },
          house: { type: "string", example: "32 Californiestraat" },
          room: { type: "string", example: "Room B" },
          arrivalDate: { type: "string", format: "date-time", example: "2025-09-15T10:00:00.000Z" },
          departureDate: { type: "string", format: "date-time", example: "2025-09-20T10:00:00.000Z" },
          createdAt: { type: "string", format: "date-time", example: "2025-09-15T10:00:00.000Z" },
          updatedAt: { type: "string", format: "date-time", example: "2025-09-15T10:00:00.000Z" }
        }
      },
      OccupancyInput: {
        type: "object",
        required: ["occupantCode", "house", "room", "arrivalDate", "departureDate"],
        properties: {
          occupantCode: { type: "string", example: "JD123" },
          house: { type: "string", example: "32 Californiestraat" },
          room: { type: "string", example: "Room B" },
          arrivalDate: { type: "string", format: "date-time", example: "2025-09-15T10:00:00.000Z" },
          departureDate: { type: "string", format: "date-time", example: "2025-09-20T10:00:00.000Z" }
        }
      }
    }
  }
};
