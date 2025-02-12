import React from 'react'
import { Badge } from 'react-bootstrap'
import styles from './MovieCardVertical.style.module.css'
import { useMovieGenreQuery } from '../../hooks/useMovieGenreQuery'
const MovieCard = ({movie}) => {

  const {data:genreData}=useMovieGenreQuery()
 const showGenre =(genreIdList)=>{
    if(!genreData) return []
    const genreNameList =genreIdList.map((id)=>{
      const genreObj = genreData.find((genre)=>genre.id === id)
      return genreObj.name
    })
    return genreNameList
  }
  return (
    <div style={{
        backgroundImage : "url(" + `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` + ")"
    }}
    className={styles.MovieCard}>
        <div className={styles.over_lay}>
        <h4>{movie?.title}</h4>
        {showGenre(movie?.genre_ids).map((id)=>(
            <Badge bg="danger">{id}</Badge>
        ))}
        <div>
            <div>{movie?.vote_average}</div>
            <div>{movie?.popularity}</div>
            <div>{movie?.adult ? "over18":"under18"}</div>
        </div>
    </div>
    </div>
  )
}

export default MovieCard