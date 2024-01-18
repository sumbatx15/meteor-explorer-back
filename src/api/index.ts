import express from "express";

import MessageResponse from "../interfaces/MessageResponse";
import emojis from "./emojis";
import asteroids from "./asteroids";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/emojis", emojis);
router.use("/asteroids", asteroids);

export default router;
