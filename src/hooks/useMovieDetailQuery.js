import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"

const fetchMovieDetail=(select_movie_id)=>{
    // console.log("qqq",movie_id)
    return api.get (`/movie/${select_movie_id}?language=ko`)
}

export const useMovieDetailQuery =(select_movie_id)=>{
    return useQuery({
        queryKey : ['movie-detail',select_movie_id],
        queryFn : () => fetchMovieDetail(select_movie_id),
        retry : 1 , 
        select : (result)=>result.data
    })
}