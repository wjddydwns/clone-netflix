import { useQuery } from '@tanstack/react-query'
import api from "../utils/api"

const fetchMovieTrailer=(movie_id)=>{
    return api.get(`/movie/${movie_id}/videos?language=en,ko`)
}
export const useMovieTrailerQuery=(movie_id)=>{
    return useQuery({
        queryKey : ['movie-trailer',movie_id],
        queryFn : ()=> fetchMovieTrailer(movie_id),
        select:(result)=>result.data
    })
}