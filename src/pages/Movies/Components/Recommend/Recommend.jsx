import React from 'react'
import { useRecommendMovieQuery } from '../../../../hooks/useRecommendMovieQuery'
import Alert from 'react-bootstrap/Alert';
import GridCard from '../../../../common/GridCard/GridCard';
const Recommend = ({select_movie_id}) => {
  
    const {data,isLoading,isError,error} = useRecommendMovieQuery(select_movie_id)
    console.log("qqq",data)

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
        <GridCard 
        title={`관련 추천 영화`} 
        movies={data.results} />
    </div>

  )
}

export default Recommend