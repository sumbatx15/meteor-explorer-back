import asteroidsJson from "../data/asteroids.json";
import {
  Asteroid,
  CacheKey,
  createAsteroidYearMap,
  createCacheKey,
  findAsteroidByMinMass,
  getAsteroidYear,
  paginateAsteroids,
  sortAsteroidsByMass,
} from "./utils";

const allAsteroids = sortAsteroidsByMass(asteroidsJson as Asteroid[]);
const asteroidsMap = createAsteroidYearMap(allAsteroids);
const cache: Record<CacheKey, AsteroidResponse> = {};

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
  const cacheKey = createCacheKey(year, mass, page, pageSize);
  if (cache[cacheKey]) return cache[cacheKey];

  const { asteroids, resultQuery } = searchAsteroids(year, mass);
  const paginatedAsteroids = paginateAsteroids(asteroids, page, pageSize);

  const result = {
    resultQuery,
    ...paginatedAsteroids,
  };

  cache[cacheKey] = result;
  cache[createCacheKey(resultQuery.year, mass, page, pageSize)] = result;

  return result;
};
