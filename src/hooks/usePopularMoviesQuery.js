import { useQuery } from '@tanstack/react-query'
import api from "../utils/api"

const fetchPopularMovies=()=>{
   
    return api.get(`/movie/now_playing?language=ko-KR&page=1`)
}
export const usePopularMoviesQuery=()=>{
    return useQuery({
        queryKey : ['movie-popular'],
        queryFn : fetchPopularMovies,
        select:(result)=>result.data
    })
}