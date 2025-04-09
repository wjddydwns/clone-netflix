import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MovieCardVertical from '../MovieCardVertical/MovieCardVertical';
import styles from './GridCard.module.css'; // CSS 모듈 추가하면 좋습니다

const GridCard = ({ title, movies }) => {
  // 영화 데이터가 없는 경우 처리
  if (!movies || movies.length === 0) {
    return (
      <Container fluid="sm" className='d-flex justify-content-center align-items-center'>
        <h2 className="title">{title}</h2>
        <p>영화 데이터가 없습니다.</p>
      </Container>
    );
  }

  return (
    <Container fluid="sm" className='d-flex justify-content-center align-items-center flex-column'>
      <h2 className="title text-center mb-4">{title}</h2>
      <Row className="g-4 justify-content-center">
        {movies.map((movie, index) => (
          <Col 
            key={movie.id || index} 
            lg={3} 
            md={4} 
            sm={6} 
            xs={12} // 모바일에서 전체 너비 사용
            className="d-flex justify-content-center"
          >
            <MovieCardVertical movie={movie} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GridCard;