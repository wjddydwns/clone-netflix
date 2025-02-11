import './TopRateMovieSlide.style.css'
import React from 'react'
import { useTopRateMoviesQuery } from '../../../../hooks/useTopRateMoiveQuery'
import Alert from 'react-bootstrap/Alert';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';

const TopRateMovieSlide = () => {
    const {data,isLoading,isError,error} = useTopRateMoviesQuery()
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
        title='평점 높은 영화' 
        movies={data.results} 
        responsive={responsive}/>
    </div>
    );
  };

export default TopRateMovieSlide