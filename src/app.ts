import express, { Application } from "express";
import morgan from "morgan";

// Routes
import indexRoutes from "./routes/index.routes";
import temporalTableRoutes from './routes/queries.routes';      // Routes to massive charge / temp table

export class App {
  private app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
  }

  routes() {
    // test routes
    this.app.use(indexRoutes);
    this.app.use(temporalTableRoutes)
  }

  settings() {
    this.app.set("port", this.port || process.env.PORT || 4000);
  }

  async listen() {
    await this.app.listen(this.app.get("port"));
    console.log("Server running on port ", this.app.get("port"));
  }
}
