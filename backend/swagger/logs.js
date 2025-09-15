// swagger/logs.js

module.exports = {
  paths: {
    "/logs": {
      get: {
        summary: "Retrieve all logs",
        tags: ["Logs"],
        responses: {
          200: {
            description: "List of logs",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Log"
                  }
                }
              }
            }
          },
          400: {
            description: "Error retrieving logs",
            content: {
              "application/json": {
                example: { error: "Error retrieving logs." }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Log: {
        type: "object",
        properties: {
          _id: { type: "string", example: "64f0c0e8a1b2c3d4e5f67890" },
          email: { type: "string", example: "john@example.com" },
          action: { type: "string", example: "User login" },
          remarks: { type: "string", example: "Successful login from IP 127.0.0.1" },
          date: { type: "string", format: "date-time", example: "2025-09-15T10:00:00.000Z" }
        }
      }
    }
  }
};
