import React from 'react'
import './Banner.style.css'
import { usePopluarMoviesQuery } from '../../../../hooks/usePopularMoviesQuery'
import FadeContent from '../../../../assets/Animations/FadeContent/FadeContent'
import Alert from 'react-bootstrap/Alert';


const Banner = () => {
    const {data,isLoading,isError,error} = usePopluarMoviesQuery()
    console.log("data",data)
    if(isLoading){
      <h1>Loading...</h1>
    }
    if(isError){
      <Alert variant='danger'>{error.message}</Alert>
    }
  return (
    // data 를 보면 poster_path 는 end_point 경로만 제공해줘서 이미지를 이런식으로 작성해야함.
    <div style={{
      backgroundImage:"url(" + `https://media.themoviedb.org/t/p/w1920_and_h1080_bestv2${data?.results[0].poster_path}` + ")"
    }}
    className='banner'>
      <div className='pop_info'>
      <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
      <h1>{data?.results[0].title}</h1>
      <p>{data?.results[0].overview}</p>
</FadeContent>
      </div>
    </div>
  )
}

export default Banner