import React, { useState } from 'react';
import './Banner.style.css';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMoviesQuery';
import FadeContent from '../../../../assets/Animations/FadeContent/FadeContent';
import Alert from 'react-bootstrap/Alert';
import Banner_Video from '../Banner_Video/Banner_Video';

const Banner = () => {
    const { data, isLoading, isError, error } = usePopularMoviesQuery();
    const [videoEnded, setVideoEnded] = useState(false); // 🎬 동영상이 끝났는지 여부

    if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <Alert variant='danger'>{error.message}</Alert>;

    return (
        <div className="banner-container">
            {/* 🎬 동영상이 끝나기 전에는 Banner를 숨기고, 끝나면 표시 */}
            {!videoEnded && <Banner_Video onVideoEnd={() => setVideoEnded(true)} />}
                   
            {/* 🎬 동영상이 끝나면 배너 표시 */}
            <div
                className="banner"
                style={{
                    backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h1080_bestv2${data?.results[0].poster_path})`,
                    display: videoEnded ? 'block' : 'none', // 🎬 동영상이 끝나기 전까지 숨김
                    opacity: videoEnded ? 1 : 0, // 자연스럽게 나타나도록 설정
                    transition: 'opacity 1s ease-in-out'
                }}
            >
                <div className='pop_info'>
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                        <h1>{data?.results[0].title}</h1>
                        <p>{data?.results[0].overview}</p>
                    </FadeContent>
                </div>
            </div>
        </div>
    );
};

export default Banner;
