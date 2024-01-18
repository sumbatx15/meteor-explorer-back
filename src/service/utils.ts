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

export const sortByYear = (a: Asteroid, b: Asteroid) => {
  const aYear = getAsteroidYear(a);
  const bYear = getAsteroidYear(b);
  if (aYear && bYear) return aYear - bYear;
  if (aYear) return -1;
  if (bYear) return 1;
  return 0;
};

export const getAsteroidYear = (asteroid?: Asteroid) => {
  if (!asteroid?.year) return null;
  return new Date(asteroid.year).getFullYear();
};

export const findAsteroidByMinMass = (mass: number, asteroids: Asteroid[]) => {
  let left = 0;
  let right = asteroids.length - 1;
  let result;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    const asteroid = asteroids[mid];
    if (+asteroid.mass === mass) {
      return asteroid;
    } else if (+asteroid.mass > mass) {
      result = asteroids[mid];
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return result;
};
