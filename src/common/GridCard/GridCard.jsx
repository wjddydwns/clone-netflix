import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MovieCardVertical from '../MovieCardVertical/MovieCardVertical';
import MovieCard from '../MovieCardVertical/MovieCardVertical';

const GridCard = ({ title, movies }) => {
  return (
    <Container fluid="sm" className='d-flex justify-content-center align-items-center flex-column'>
    <h2 className="title">{title}</h2>
    <Row className="g-4">
      {movies?.map((movie, index) => (
        <Col key={index} lg={3} md={4} sm={6} xs={10}>
          <MovieCard movie={movie} />
        </Col>
      ))}
    </Row>
  </Container>
  
  );
};

export default GridCard;
