// swagger/auth.js

module.exports = {
  paths: {
    "/auth/signup": {
      post: {
        summary: "Register a new user",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["firstName", "lastName", "codeName", "email", "password"],
                properties: {
                  firstName: { type: "string", example: "John" },
                  lastName: { type: "string", example: "Doe" },
                  codeName: { type: "string", example: "JD123" },
                  email: { type: "string", example: "john@example.com" },
                  password: { type: "string", example: "Secret123!" },
                  role: { type: "string", example: "admin" }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: "User created successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" }
              }
            }
          },
          400: { description: "Missing fields or invalid password" },
          409: { description: "Email or codeName already in use" },
          500: { description: "Server error" }
        }
      }
    },
    "/auth/login": {
      post: {
        summary: "Login user and return JWT",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", example: "john@example.com" },
                  password: { type: "string", example: "Secret123!" }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Login successful, returns user data and token",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/AuthResponse" } }
            }
          },
          401: { description: "Invalid credentials" },
          500: { description: "Server error" }
        }
      }
    },
    "/auth/{id}": {
      delete: {
        summary: "Delete a user and its auth record",
        tags: ["Auth"],
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "string" } }
        ],
        responses: {
          200: { description: "User and auth deleted" },
          404: { description: "User not found" },
          500: { description: "Server error" }
        }
      }
    },
    "/auth/validate": {
      post: {
        summary: "Validate JWT token and return user data",
        tags: ["Auth"],
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Token valid, user data returned", content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } },
          401: { description: "Token missing, invalid, or expired" },
          500: { description: "Server error" }
        }
      }
    },
    "/auth/password": {
      put: {
        summary: "Update user password",
        tags: ["Auth"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["currentPassword", "newPassword"],
                properties: {
                  currentPassword: { type: "string", example: "Secret123!" },
                  newPassword: { type: "string", example: "NewSecret123!" }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Password updated successfully" },
          400: { description: "Missing fields or invalid new password" },
          401: { description: "Invalid current password or token missing" },
          404: { description: "User or Auth record not found" },
          500: { description: "Server error" }
        }
      }
    },
    "/auth/request-password-reset": {
      post: {
        summary: "Request a password reset link (Brevo)",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object", required: ["email"], properties: { email: { type: "string", example: "john@example.com" } } }
            }
          }
        },
        responses: {
          200: { description: "Reset link sent to email" },
          404: { description: "User not found" },
          500: { description: "Server error" }
        }
      }
    },
    "/auth/reset-password": {
      post: {
        summary: "Reset user password using token",
        tags: ["Auth"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object", required: ["newPassword"], properties: { newPassword: { type: "string", example: "NewSecret123!" } } }
            }
          }
        },
        responses: {
          200: { description: "Password successfully reset" },
          400: { description: "Invalid token or request" },
          401: { description: "Token expired or missing" },
          404: { description: "User not found" },
          500: { description: "Server error" }
        }
      }
    }
  },
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          _id: { type: "string", example: "64f0c0e8a1b2c3d4e5f67890" },
          firstName: { type: "string", example: "John" },
          lastName: { type: "string", example: "Doe" },
          codeName: { type: "string", example: "JD123" },
          email: { type: "string", example: "john@example.com" },
          role: { type: "string", example: "admin" },
          settings: { type: "object", properties: { preferredLanguage: { type: "string", enum: ["en", "nl"], example: "en" } } },
          createdAt: { type: "string", format: "date-time", example: "2025-09-15T10:00:00.000Z" },
          updatedAt: { type: "string", format: "date-time", example: "2025-09-15T10:00:00.000Z" }
        }
      },
      AuthResponse: {
        type: "object",
        properties: {
          userId: { type: "string" },
          token: { type: "string" },
          firstName: { type: "string" },
          lastName: { type: "string" },
          email: { type: "string" },
          codeName: { type: "string" },
          role: { type: "string" },
          settings: { type: "object", properties: { preferredLanguage: { type: "string" } } }
        }
      }
    },
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
    }
  }
};
