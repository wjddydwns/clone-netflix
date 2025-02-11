import { useQuery } from '@tanstack/react-query'
import api from "../utils/api"

const fetchUpmcomingMovies=()=>{
    return api.get(`/movie/upcoming?language=ko&page=1&region=KR`)
}
export const useUpcomingMoviesQuery=()=>{
    return useQuery({
        queryKey : ['movie-upcoming'],
        queryFn : fetchUpmcomingMovies,
        select:(result)=>result.data
    })
}