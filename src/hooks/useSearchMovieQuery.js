import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"

const fetchSearchMovies=({keyword})=>{
    return keyword?api.get(`/search/movie?query=${keyword}&language=ko&region=KR`) : api.get(`/movie/popular?language=ko&page=1&region=KR`)
}

export const useSearchMovieQuery=({keyword})=>{
    return useQuery({
        queryKey : [`movie-search`,keyword],
        queryFn : ()=>fetchSearchMovies({keyword}),
        select : (result)=>result.data
    })
}