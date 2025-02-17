import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"

const fetchMovieCredit=(select_movie_id)=>{
    // console.log("qqq",movie_id)
    return api.get (`/movie/${select_movie_id}/credits?language=ko`)
}

export const useMovieCreditQuery =(select_movie_id)=>{
    return useQuery({
        queryKey : ['movie-credit',select_movie_id],
        queryFn : () => fetchMovieCredit(select_movie_id),
        retry : 1 , 
        select : (result)=>result.data
    })
}