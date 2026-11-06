import { Router, type IRouter } from "express";
import healthRouter from "./health";
import representationsRouter from "./representations";

const router: IRouter = Router();

router.use(healthRouter);
router.use(representationsRouter);

export default router;
