import express from "express";

import asteroidsQuery from "./asteroids/query";
import asteroidsYears from "./asteroids/years";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/asteroids/query", asteroidsQuery);
router.use("/asteroids/years", asteroidsYears);

export default router;
