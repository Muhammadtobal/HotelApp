import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API Documentation",
      version: "1.0.0",
      description: "توثيق API باستخدام Swagger",
    },
    servers: [{ url: "http://localhost:8000", description: "local server" }],
  },
  apis: ["./routes/*.js"], 
};
const swaggerSpec = swaggerJsdoc(options);
 const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
export default setupSwagger