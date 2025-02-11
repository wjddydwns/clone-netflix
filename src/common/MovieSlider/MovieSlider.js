import React from 'react'
import './MovieSlider.style.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard  from '../MovieCard/MovieCard'



const MovieSlider = ({title,movies,responsive }) => {
    
  return (
    <div className='slide_container'>
      <div className='title'>{title}</div>
      <div className='slide_box'>
      <Carousel
        infinite={true}
        centerMode={true}
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
        responsive={responsive}
      >
        {movies?.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </Carousel>
    </div>
    </div>
    
  )
}

export default MovieSlider