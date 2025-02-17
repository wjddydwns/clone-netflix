// src/hooks/useMovieInfoQuery.js
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieInfo = async (movie_id) => {
  const [detailRes, creditRes] = await Promise.all([
    api.get(`/movie/${movie_id}/?language=ko`),
    api.get(`/movie/${movie_id}/credits?language=ko`),
  ]);
  return {
    detail: detailRes.data,
    credits: creditRes.data,
  };
};

export const useMovieInfoQuery = (movie_id) => {
  return useQuery({
    queryKey: ['movie-info', movie_id],
    queryFn: () => fetchMovieInfo(movie_id),
    enabled: !!movie_id,
    select: (data) => ({
      detail: data.detail,
      credits: data.credits,
    }),
  });
};
