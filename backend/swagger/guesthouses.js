// swagger/guesthouses.js

module.exports = {
  paths: {
    "/guesthouses": {
      get: {
        summary: "Retrieve all guest houses",
        tags: ["Guest Houses"],
        responses: {
          200: {
            description: "List of guest houses",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/GuestHouse" }
                }
              }
            }
          },
          400: {
            description: "Error retrieving guest houses",
            content: {
              "application/json": {
                example: { error: "Error retrieving guest houses." }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      GuestHouse: {
        type: "object",
        properties: {
          _id: { type: "string", example: "64f0c0e8a1b2c3d4e5f67890" },
          name: { type: "string", example: "32 Californiestraat" },
          rooms: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string", example: "Room B" },
                description: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      language: { type: "string", example: "en" },
                      text: { type: "string", example: "Spacious room with sea view" }
                    }
                  }
                }
              }
            }
          },
          createdAt: { type: "string", format: "date-time", example: "2025-09-15T10:00:00.000Z" },
          updatedAt: { type: "string", format: "date-time", example: "2025-09-15T10:00:00.000Z" }
        }
      }
    }
  }
};
