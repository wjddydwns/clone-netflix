import React from 'react'
// 1. 배너 (top popluar movie)
// 2. popluar 
//2 . popluar
//3. top rated Movie
//4 upcoming movie
import Banner from './Components/Banner/Banner'
import PopularMovieSlide from './Components/PopularMovieSlide/PopularMovieSlide'
const Homepage = () => {
  return (
    <div>
      <Banner/>
      <PopularMovieSlide/>
    </div>
  )
}

export default Homepage