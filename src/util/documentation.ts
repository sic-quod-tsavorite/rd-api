import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { Application } from "express";

/**
 * Setup Swagger documentation
 * @param app
 */
export function setupDocs(app: Application) {
  // swagger definition
  const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      title: "Rubber duck, SWAGger",
      version: "1.0.0",
      description: "Description",
    },
    servers: [
      {
        url: "http://localhost:" + (process.env.PORT || 4000) + "/rd-api/",
        description: "Local development server",
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "auth-token",
        },
      },
      schemas: {
        Duck: {
          type: "object",
          properties: {
            name: { type: "string" },
            description: { type: "string" },
            imageURL: { type: "string" },
            price: { type: "number" },
            onSale: { type: "boolean" },
            discountPct: { type: "number" },
            isHidden: { type: "boolean" },
            _createdBy: { type: "string" },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
            registerDate: { type: "string" },
          },
        },
      },
    },
  };

  // swagger options
  const options = {
    swaggerDefinition,

    // Path to the files containing OpenAPI definitions
    apis: ["**/*.ts"],
  };

  // swagger spec
  const swaggerSpec = swaggerJSDoc(options);

  // create docs route
  app.use("/rd-api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
