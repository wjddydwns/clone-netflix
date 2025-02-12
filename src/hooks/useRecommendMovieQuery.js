import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

// 비슷한 영화를 가져오는 함수
const fetchRecommendMovies = () => {
  return api.get(`/movie/939243/recommendations?language=ko`);
};

// 커스텀 훅: 특정 영화의 유사 영화 목록 조회
export const useRecommendMovieQuery = () => {
  return useQuery({
    queryKey: ["movies-recommend"],
    queryFn:()=> fetchRecommendMovies(),
    select: (result) => result.data
  });
};
