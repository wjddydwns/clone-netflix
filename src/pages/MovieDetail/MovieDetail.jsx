import React, { useMemo, useCallback, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovieInfoQuery } from '../../hooks/useMovieInfoQuery';
import Modal from 'react-bootstrap/Modal';
import Banner from '../Homepage/Components/Banner/Banner';
import './MovieDetail.style.css';
import Recommend from '../Movies/Components/Recommend/Recommend';

// 로딩 컴포넌트 메모이제이션
const LoadingContent = memo(() => (
  <div className="loading-content">로딩 중...</div>
));

// 에러 컴포넌트 메모이제이션
const ErrorContent = memo(() => (
  <div className="error-content">영화 정보를 불러오는 중 에러가 발생했습니다.</div>
));

// 영화 정보 컴포넌트 메모이제이션
const MovieInfo = memo(({ detail, topCast }) => (
  <div className="movie-detail-content">
    <h2>{detail?.title}</h2>
    <p>{detail?.overview}</p>
    <div className="movie-info">
      <span>⭐ 평점: {detail?.vote_average?.toFixed(1)}</span>
      <span>🔥 인기: {detail?.popularity?.toLocaleString()}</span>
      <span>📅 개봉일: {detail?.release_date}</span>
    </div>
    <div className="movie-cast">
      <strong>출연:</strong> {topCast}
    </div>
  </div>
));

const MovieDetail = () => {
  const { select_movie_id } = useParams();
  const navigate = useNavigate();

  // 커스텀 훅 사용
  const { data, isLoading, error } = useMovieInfoQuery(select_movie_id);

  // handleClose 함수 메모이제이션
  const handleClose = useCallback(() => navigate(-1), [navigate]);

  // 출연진 데이터 메모이제이션
  const topCast = useMemo(() => {
    return data?.credits?.cast?.slice(0, 5).map((actor) => actor.name).join(', ') || '출연진 정보 없음';
  }, [data?.credits?.cast]);

  // 모달 기본 설정 메모이제이션
  const modalProps = useMemo(() => ({
    show: !!select_movie_id,
    onHide: handleClose,
    centered: true,
    size: "xl",
    dialogClassName: "custom-modal"
  }), [select_movie_id, handleClose]);

  // 로딩 및 에러 처리
  if (isLoading) {
    return (
      <Modal {...modalProps} size="lg">
        <LoadingContent />
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal {...modalProps} size="lg">
        <ErrorContent />
      </Modal>
    );
  }

  return (
    <Modal {...modalProps}>
      {/* 배너 */}
      <Banner select_movie_id={select_movie_id} />

      {/* 상세 정보 */}
      <MovieInfo detail={data?.detail} topCast={topCast} />
      
      {/* 추천 영화 */}
      <Recommend select_movie_id={select_movie_id} />
    </Modal>
  );
};

export default memo(MovieDetail);