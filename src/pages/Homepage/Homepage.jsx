import React from 'react'
// 1. 배너 (top popluar movie)
// 2. popluar 
//2 . popluar
//3. top rated Movie
//4 upcoming movie
import Banner from './Components/Banner/Banner'
import PopularMovieSlide from './Components/PopularMovieSlide/PopularMovieSlide'
import TopRateMovieSlide from './Components/TopRateMovieSlide/TopRateMovieSlide'
import UpcomingMoviesSlide from './Components/UpcomingMoviesSlide/UpcomingMoviesSlide'
import Banner_Video from './Components/Banner_Video/Banner_Video'
const Homepage = () => {
  return (
    <div style={{
      backgroundColor:"#0c0c0c"}}>
      <Banner/>
      <PopularMovieSlide/>
      <TopRateMovieSlide/>
      <UpcomingMoviesSlide/>    
      </div>

  )
}

export default Homepage