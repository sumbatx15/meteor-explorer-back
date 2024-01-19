import express from "express";

import asteroidsQuery from "./asteroids/query";
import asteroidsYears from "./asteroids/years";

const router = express.Router();

router.use("/asteroids/query", asteroidsQuery);
router.use("/asteroids/years", asteroidsYears);

export default router;
