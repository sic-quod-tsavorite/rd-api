import express, { Application /*, Request, Response*/ } from "express";
import dotenvFlow from "dotenv-flow";
import routes from "./routes";
import { setupDocs } from "./util/documentation";
import { testConnection } from "./repository/database";
import cors from "cors";

dotenvFlow.config();

// create express application
const app: Application = express();

export function startServer() {
  // cors first
  setupCors();

  // json body parser
  app.use(express.json());

  // bind routes to the api
  app.use("/rd-api", routes);

  // Docs
  setupDocs(app);

  //test connection by first connecting and then disconnecting to the db
  testConnection();

  // start the server and get port from .env or default to 4000
  const PORT: number = parseInt(process.env.PORT as string) || 4000;
  app.listen(PORT, function () {
    console.log("Server is running on port: " + PORT);
  });
}

/**
 * setup CORS policy
 */
function setupCors() {
  app.use(
    cors({
      origin: "*", // Allow requests from any origin
      // allow methods + headers + credentials
      methods: "GET,HEAD,PUT,OPTIONS,PATCH,POST,DELETE",
      allowedHeaders: [
        "auth-token",
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
      ], // Allow specific headers
      credentials: true,
    })
  );
}
