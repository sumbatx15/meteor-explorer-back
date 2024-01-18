import express from "express";

import MessageResponse from "../interfaces/MessageResponse";
import emojis from "./emojis";
import asteroidsQuery from "./asteroids/query";
import asteroidsYears from "./asteroids/years";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/emojis", emojis);
router.use("/asteroids/query", asteroidsQuery);
router.use("/asteroids/years", asteroidsYears);

export default router;
