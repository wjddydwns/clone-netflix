import React from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovieQuery';
import { useSearchParams } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import './MoviePage.style.css'
import { responsive } from '../../constants/responsive';
import MovieSlider from '../../common/MovieSlider/MovieSlider';
import Recommend from './Components/Recommend/Recommend';
// nav바에서 클릭
// keyword (검색)
const MoviePage = () => {
  const [query,setQuery] = useSearchParams()
  const keyword = query.get("q")
  const {data,isLoading,isError,error} = useSearchMovieQuery({keyword})

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
    <div className='padding_box'>
      <MovieSlider
      title={`'${keyword}' 에 대한 검색결과`}
      movies={data.results} 
      responsive={responsive}/>
  </div>
  );
};

export default MoviePage