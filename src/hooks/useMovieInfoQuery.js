// src/hooks/useMovieInfoQuery.js
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieInfo = async (movie_id) => {
  try {
    const [detailRes, creditRes, similarRes] = await Promise.all([
      api.get(`/movie/${movie_id}?language=ko`),
      api.get(`/movie/${movie_id}/credits?language=ko`),
      api.get(`/movie/${movie_id}/similar`),
    ]);
    return {
      detail: detailRes.data,
      credits: creditRes.data,
      similar : similarRes.data,
    };
  } catch (error) {
    throw new Error(`영화 정보를 불러오는 중 에러 발생: ${error.message}`);
  }
};

export const useMovieInfoQuery = (movie_id) => {
  return useQuery({
    queryKey: ['movie-info', movie_id],
    queryFn: () => fetchMovieInfo(movie_id),
    enabled: !!movie_id,
    select: (data) => ({
      detail: data.detail,
      credits: data.credits,
      similar : data.similar,
    }),
    staleTime: 1000 * 60 * 5, // 5분간 캐싱 유지
    cacheTime: 1000 * 60 * 10, // 10분간 캐싱 유지
    retry: 2, // 요청 실패 시 최대 2회 재시도
    refetchOnWindowFocus: false, // 포커스 시 자동 새로고침 비활성화
  });
};
