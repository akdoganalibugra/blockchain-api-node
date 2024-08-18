import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Blockchain API",
            version: "1.0.0",
            description:
                "Blockchain ağı ile etkileşim sağlayan API dokümantasyonu",
        },
        servers: [
            {
                url: "http://localhost:3000/api",
            },
        ],
    },
    apis: ["./src/routes/*.ts", "./src/controllers/*.ts", "./src/docs/*.ts"],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
