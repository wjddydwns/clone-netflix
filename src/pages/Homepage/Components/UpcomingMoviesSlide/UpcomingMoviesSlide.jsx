import React from 'react'
import { useUpcomingMoviesQuery } from '../../../../hooks/useUpcomingMovieQuery'
import Alert from 'react-bootstrap/Alert';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';

const UpcomingMoviesSlide = () => {
    const {data,isLoading,isError,error} = useUpcomingMoviesQuery()
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
        title='Popular Movies' 
        movies={data.results} 
        responsive={responsive}/>
    </div>
    );
  };

export default UpcomingMoviesSlide