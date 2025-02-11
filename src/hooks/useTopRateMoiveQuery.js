import { useQuery } from '@tanstack/react-query'
import api from "../utils/api"

const fetchTopRateMovies=()=>{
    return api.get(`/movie/top_rated?language=ko&page=1&region=KR`)
}
export const useTopRateMoviesQuery=()=>{
    return useQuery({
        queryKey : ['movie-top-rated'],
        queryFn : fetchTopRateMovies,
        select:(result)=>result.data
    })
}