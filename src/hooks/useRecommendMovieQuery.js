import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

// 비슷한 영화를 가져오는 함수
const fetchRecommendMovies = (select_movie_id) => {
  return api.get(`/movie/${select_movie_id}/recommendations?language=ko`);
};

// 커스텀 훅: 특정 영화의 유사 영화 목록 조회
export const useRecommendMovieQuery = (select_movie_id) => {
  return useQuery({
    queryKey: ["movies-recommend",select_movie_id],
    queryFn:()=> fetchRecommendMovies(select_movie_id),
    select: (result) => result.data
  });
};
