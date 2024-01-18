import express from "express";
import { AsteroidResponse, getAsteroids } from "../service/asteroids";

const router = express.Router();

router.post<
  null,
  AsteroidResponse,
  { year: number; mass?: number; page?: number; pageSize?: number }
>("/", (req, res) => {
  const { year, mass, page, pageSize } = req.body;
  res.json(getAsteroids(year, mass, page, pageSize));
});

export default router;
