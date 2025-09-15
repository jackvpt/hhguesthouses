const swaggerUi = require("swagger-ui-express")

// Import swagger docs from different modules
const logsSwagger = require("./logs.js")
const authSwagger = require("./auth.js")
const guesthousesSwagger = require("./guesthouses.js")
const occupanciesSwagger = require("./occupancies.js")

// Merge components.schemas safely
const mergedComponents = {
  schemas: {
    ...(logsSwagger.components?.schemas || {}),
    ...(authSwagger.components?.schemas || {}),
    ...(guesthousesSwagger.components?.schemas || {}),
    ...(occupanciesSwagger.components?.schemas || {}),
  },
  securitySchemes: {
    ...(logsSwagger.components?.securitySchemes || {}),
    ...(authSwagger.components?.securitySchemes || {}),
    ...(guesthousesSwagger.components?.securitySchemes || {}),
    ...(occupanciesSwagger.components?.securitySchemes || {}),
  },
}

const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "HHGuesthouses API",
    version: "1.0.0",
  },
  paths: {
    ...logsSwagger.paths,
    ...authSwagger.paths,
    ...guesthousesSwagger.paths,
    ...occupanciesSwagger.paths,
  },
  components: mergedComponents,
}

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
