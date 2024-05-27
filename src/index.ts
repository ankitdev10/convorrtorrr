import "reflect-metadata";
import { Server } from "./core/server";

class App extends Server {
  constructor() {
    super();
    this.init().catch((err) => {
      process.exit(1);
    });
  }

  async init() {
    this.start();
  }
}

new App();
