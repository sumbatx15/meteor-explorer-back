import asteroidsJson from "../data/asteroids.json";
import {
  Asteroid,
  createAsteroidYearMap,
  findAsteroidByMinMass,
  getAsteroidYear,
  sortAsteroidsByMass,
} from "./utils";

const allAsteroids = sortAsteroidsByMass(asteroidsJson as Asteroid[]);
const asteroidsMap = createAsteroidYearMap(allAsteroids);

const getAsteroidsByYear = (year?: number) => {
  return (year ? asteroidsMap[year] : allAsteroids) || [];
};

const getAsteroidsByMass = (mass?: number, asteroids = allAsteroids) => {
  if (!mass) return asteroids;
  return asteroids.filter((asteroid) => +asteroid.mass >= mass);
};

const searchAsteroids = (year?: number, mass?: number) => {
  const asteroidsByYear = getAsteroidsByYear(year);
  const asteroidsByMass = getAsteroidsByMass(mass, asteroidsByYear);

  if (!asteroidsByMass.length && mass) {
    const found = findAsteroidByMinMass(mass, allAsteroids);
    const foundYear = getAsteroidYear(found);
    return {
      resultQuery: { year: foundYear ?? year },
      asteroids: foundYear
        ? getAsteroidsByMass(mass, asteroidsMap[foundYear])
        : [],
    };
  }

  return {
    resultQuery: { year },
    asteroids: asteroidsByMass,
  };
};

export type AsteroidResponse = {
  asteroids: Asteroid[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  resultQuery: {
    year?: number;
  };
};

export const getAsteroids = (
  year?: number,
  mass?: number,
  page: number = 1,
  pageSize: number = 10
): AsteroidResponse => {
  const { asteroids, resultQuery } = searchAsteroids(year, mass);

  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

  const paginatedAsteroids = asteroids.slice(startIndex, endIndex);

  const totalPages = Math.ceil(asteroids.length / pageSize);

  return {
    resultQuery,
    asteroids: paginatedAsteroids,
    total: asteroids.length,
    page,
    pageSize,
    totalPages,
  };
};

export type YearsResponse = {
  years: string[];
};

export const getYears = () => {
  return Object.keys(asteroidsMap);
};
