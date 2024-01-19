import express from "express";
import { AsteroidResponse, getAsteroids } from "../../service/asteroids";

const router = express.Router();

router.post<
  null,
  AsteroidResponse,
  { year: number; mass?: number; page?: number; pageSize?: number }
>("/", async (req, res) => {
  const { year, mass, page, pageSize } = req.body;
  res.json(getAsteroids(+year, +(mass || 0), page, pageSize));
});

export default router;
