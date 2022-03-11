import { TMDB_API_KEY } from '@env';

import api from './api';

import { parseShows } from '../utils/Utils';

import { IShow } from '@model/IShow';
import { IShowProvider } from '@model/IShowProvider';
import { IGenre } from '@model/IGenre';
import { ICast } from '@model/ICast';

const getShows = async (endpoint: string, page: number): Promise<any> => {
  const response = await api.get(
    `${endpoint}?api_key=${TMDB_API_KEY}&language=pt-BR&region=BR&page=${page}`
  );

  return response;
};

export const getTopRatedShows = async (page: number): Promise<IShow[]> => {
  const response = await getShows('/tv/top_rated', page);
  const { results } = response.data;
  return parseShows(results);
};

export const getPopularShows = async (page: number): Promise<IShow[]> => {
  const response = await getShows('/tv/popular', page);
  const { results } = response.data;
  return parseShows(results);
};

export const getTrendingWeekShows = async (page: number): Promise<IShow[]> => {
  const response = await getShows('/trending/tv/week', page);
  const { results } = response.data;
  return parseShows(results);
};

export const getShowProvider = async (
  movieId: number
): Promise<IShowProvider[]> => {
  const response = await api.get(
    `/tv/${movieId}/watch/providers?api_key=${TMDB_API_KEY}&language=pt-BR&region=BR`
  );

  const { results } = response.data;
  const { BR } = results;

  if (!BR || !BR.flatrate) {
    return [];
  }

  return BR.flatrate.map((provider: IShowProvider) => ({
    provider_id: provider.provider_id,
    provider_name: provider.provider_name,
    logo_path: provider.logo_path,
  }));
};

export const getGenres = async (): Promise<IGenre[]> => {
  const response = await api.get(
    `/genre/tv/list?api_key=${TMDB_API_KEY}&language=pt-BR&region=BR`
  );

  const { genres } = response.data;
  return genres.map((genre: IGenre) => ({
    id: genre.id,
    name: genre.name,
  }));
};

export const getCast = async (movieId: number): Promise<ICast[]> => {
  const response = await api.get(
    `/tv/${movieId}/credits?api_key=${TMDB_API_KEY}&language=pt-BR&region=BR`
  );

  const { cast } = response.data;

  return cast.map((castMember: ICast) => ({
    adult: castMember.adult,
    gender: castMember.gender,
    id: castMember.id,
    known_for_department: castMember.known_for_department,
    name: castMember.name,
    original_name: castMember.original_name,
    popularity: castMember.popularity,
    profile_path: castMember.profile_path,
    cast_id: castMember.cast_id,
    character: castMember.character,
    order: castMember.order,
  }));
};
