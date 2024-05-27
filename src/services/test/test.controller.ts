import { Request, Response } from "express";
import { Service } from "typedi";
import { BadRequestError } from "../../core/error";
@Service()
export class TestController {
  test = async (_req: Request, res: Response, next: any) => {
    throw new BadRequestError("test");
    return res.send("test");
  };
}
