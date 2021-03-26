import express, { Application } from "express";
import morgan from "morgan";

// Routes
import testRoutes from "./routes/index.routes";

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
    this.app.use(testRoutes);
  }

  settings() {
    this.app.set("port", this.port || process.env.PORT || 4000);
  }

  async listen() {
    await this.app.listen(this.app.get("port"));
    console.log("Server running on port ", this.app.get("port"));
  }
}
