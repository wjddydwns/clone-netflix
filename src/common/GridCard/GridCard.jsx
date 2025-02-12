import React from 'react'
import {  Container, Row,Col } from 'react-bootstrap'
import MovieCardVertical from '../MovieCardVertical/MovieCardVertical'
const GridCard = ({title,movies}) => {



 
  return (
    <Container>
         <div className='title'>{title}</div>
        <Row>
           {movies?.map((movie,index)=>(
            <Col key={index} lg={2} xs={12}>
                <MovieCardVertical movie={movie}/>
            </Col>
           ))}
        </Row>
    </Container>
  )
}

export default GridCard