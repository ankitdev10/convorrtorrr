import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "../routes";
import { ApiError, ErrorType, InternalError, NotFoundError } from "./error";
export class Server {
  private readonly _app: express.Application;
  constructor() {
    this._app = express()
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
      .use(cors())
      .use("/api", routes);

    // error handler
    this.app.use((_: Request, __: Response, next: NextFunction) => {
      return next(new NotFoundError());
    });

    this.app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
      if (err instanceof ApiError) {
        ApiError.handle(err, res);
        if (err.type === ErrorType.INTERNAL) console.log("Internal error", err);
      } else {
        if (process.env.NODE_EN === "development") {
          return res.status(500).send(err);
        }
        ApiError.handle(new InternalError(), res);
      }
    });
  }
  get app() {
    return this._app;
  }

  start() {
    this._app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  }
}
