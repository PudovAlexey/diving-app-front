import { Position } from "@src/types/geo";

async function getSunrice({ lat, lon }: Position) {
  return fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`)
    .then((res) => res.json())
    .then((res) => res.results);
}

export { getSunrice };
