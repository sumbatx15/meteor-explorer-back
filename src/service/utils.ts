export type Asteroid = {
  name: string;
  id: string;
  nametype: string;
  recclass: string;
  mass: string;
  fall: string;
  year?: string;
  reclat: string;
  reclong: string;
  geolocation: {
    type: string;
    coordinates: [number, number];
  };
};

export const createAsteroidYearMap = (asteroids: Asteroid[]) =>
  asteroids.reduce((acc, asteroid) => {
    if (!asteroid?.year) return acc;

    const year = new Date(asteroid.year).getFullYear();
    if (!isNaN(year) && !acc[year]) acc[year] = [];

    acc[year].push(asteroid);
    return acc;
  }, {} as Record<string, Asteroid[]>);

export const sortAsteroidsByMass = (asteroids: Asteroid[]) =>
  asteroids
    .filter((a) => a.mass !== undefined)
    .sort((a, b) => +a.mass - +b.mass);

export const getAsteroidYear = (asteroid?: Asteroid) => {
  if (!asteroid?.year) return;
  return new Date(asteroid.year).getFullYear();
};

export const findAsteroidByMinMass = (
  mass: number,
  asteroids: Asteroid[]
): Asteroid | undefined => {
  let left = 0;
  let right = asteroids.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const asteroid = asteroids[mid];

    if (+asteroid.mass === +mass) {
      return asteroid;
    } else if (+asteroid.mass > mass) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return asteroids[left];
};

export const paginateAsteroids = (
  asteroids: Asteroid[],
  page: number,
  pageSize: number
) => {
  const start = (page - 1) * pageSize;
  const end = page * pageSize;

  const paginatedAsteroids = asteroids.slice(start, end);
  const totalPages = Math.ceil(asteroids.length / pageSize);

  return {
    asteroids: paginatedAsteroids,
    total: asteroids.length,
    totalPages,
    page,
    pageSize,
  };
};

export type CacheKey = `${string}.${string}.${string}.${string}`;
export const createCacheKey = (
  year?: number,
  mass?: number,
  page: number = 1,
  pageSize: number = 10
): CacheKey => {
  return `${year}.${mass}.${page}.${pageSize}`;
};
