import React, { useState } from 'react';
import './Banner.style.css';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMoviesQuery';
import FadeContent from '../../../../assets/Animations/FadeContent/FadeContent';
import Alert from 'react-bootstrap/Alert';
import Banner_Video from '../Banner_Video/Banner_Video';
import { useMovieImageQuery } from '../../../../hooks/useMovieImageQuery';
import Playbutton from '../../../../common/Button/Playbutton';
import InforButton from '../../../../common/Button/InforButton';

const Banner = ({ select_movie_id }) => {
    // ✅ 인기 영화 정보
    const { data, isLoading, isError, error } = usePopularMoviesQuery();
    const movie_id = data?.results?.[0]?.id; 

    // ✅ 선택된 영화 및 기본 영화 타이틀 이미지
    const { data: movieTitleImage } = useMovieImageQuery(movie_id);
    const { data: movieSelectTitleImage } = useMovieImageQuery(select_movie_id);

    console.log("🎨 기본 타이틀 이미지:", movieTitleImage);
    console.log("🎨 선택 타이틀 이미지:", movieSelectTitleImage);

    // ✅ 동영상 종료 여부
    const [videoEnded, setVideoEnded] = useState(false);

    // ✅ 로고 선택 (한국어 우선, 없으면 영어)
    const getPreferredLogo = (logos) => {
        if (!logos?.length) return null;
        return (
            logos.find(logo => logo.iso_639_1 === 'ko') || 
            logos.find(logo => logo.iso_639_1 === 'en') ||
            null
        );
    };

    // ✅ 한국어 > 영어 로고 우선 표시
    const selectedLogo = getPreferredLogo(
        movieSelectTitleImage?.logos?.length 
            ? movieSelectTitleImage?.logos 
            : movieTitleImage?.logos
    );



    // ✅ 배경 이미지 (선택된 영화 > 기본 영화)
    const backdropPath = movieSelectTitleImage?.backdrops?.[0]?.file_path 
        || movieTitleImage?.backdrops?.[0]?.file_path 
        || data?.results?.[0]?.backdrop_path;

    // ✅ 개요 (선택된 영화 > 기본 영화)
    const overview = select_movie_id 
        ? movieSelectTitleImage?.overview 
        : data?.results?.[0]?.overview;

    // ✅ 로딩 및 에러 처리
    if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <Alert variant='danger'>{error.message}</Alert>;

    return (
        <div className="banner-container">
            <div
                className="banner"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdropPath})`,
                }}
            >
                {/* 🎬 동영상 표시 */}
                {!videoEnded && (
                    <Banner_Video 
                        select_movie_id={select_movie_id} 
                        onVideoEnd={() => setVideoEnded(true)} 
                    />
                )}

                {/* 배너 정보 */}
                <div className='pop_info'>
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                        {/* ✅ 타이틀 이미지 (한국어 > 영어) */}
                        {selectedLogo ? (
                            <div 
                                className='title_image'
                                style={{
                                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${selectedLogo.file_path})`,
                                }}
                            />
                        ) : (
                            <Alert variant="warning">🎥 유효한 한국어 또는 영어 로고가 없습니다.</Alert>
                        )}

                        {/* ✅ 개요 */}
                        <div style={{ fontSize: "20px" }}>
                            {overview ? (
                                overview
                            ) : (
                                <></>
                            )}
                        </div>

                        {/* ✅ 버튼 */}
                        <div className='button_box'>
                            <Playbutton />
                            <InforButton />
                        </div>
                    </FadeContent>
                </div>
            </div>
        </div>
    );
};

export default Banner;