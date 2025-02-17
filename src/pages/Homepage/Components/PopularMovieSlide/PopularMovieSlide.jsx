import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMoviesQuery'
import Alert from 'react-bootstrap/Alert';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';
const PopularMovieSlide = () => {

  const {data,isLoading,isError,error} = usePopularMoviesQuery()
  
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // 에러 상태 처리
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  // 데이터가 없는 경우 예외 처리 (data?.results가 존재하지 않을 경우)
  if (!data || !data.results || !Array.isArray(data.results) || data.results.length === 0) {
    return <Alert variant="warning">No movie data available</Alert>;
  }
  return (
    <div>
      <MovieSlider 
      title='인기 영화' 
      movies={data.results} 
      responsive={responsive}/>
  </div>
  );
};

export default PopularMovieSlide