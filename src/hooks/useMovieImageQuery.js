import { useQuery } from '@tanstack/react-query'
import api from "../utils/api"

const fetchMovieImage=(movie_id)=>{
    return api.get(`/movie/${movie_id}/images?language=en,ko`)
}
export const useMovieImageQuery=(movie_id)=>{
    return useQuery({
        queryKey : ['movie-Image',movie_id],
        queryFn : ()=> fetchMovieImage(movie_id),
        select:(result)=>result.data
    })
}