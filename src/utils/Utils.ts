import { IShow } from '../model/IShow';

export function parseShows(results: IShow[]): IShow[] {
  return results.map((show: IShow) => ({
    id: show.id,
    backdrop_path: show.backdrop_path,
    original_name: show.original_name,
    overview: show.overview,
    first_air_date: show.first_air_date,
    name: show.name,
    vote_average: show.vote_average,
    genre_ids: [...show.genre_ids],
  }));
}

export function getRandomItems(arr: IShow[], n: number): IShow[] {
  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);
  if (n > len) {
    throw new RangeError('getRandom: more elements taken than available');
  }
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}
