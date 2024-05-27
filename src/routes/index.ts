import { Router } from "express";
import Container from "typedi";
import { TestController } from "../services/test/test.controller";
import asyncHandler from "../core/async-handler";

const router = Router();
const container = Container.get(TestController);
router.get("/test", asyncHandler(container.test));

export default router;
