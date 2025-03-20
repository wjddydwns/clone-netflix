import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import ReactPlayer from "react-player";
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMoviesQuery';
import { useMovieTrailerQuery } from '../../../../hooks/useMovieTrailerQuery';
import './BannerVideo.style.css';

const Banner_Video = ({ onVideoEnd ,select_movie_id}) => {
    // 🎬 인기 영화 가져오기
    const { data: popularData, isLoading: isPopularLoading, isError, error } = usePopularMoviesQuery();
    const movie_id = popularData?.results?.[0]?.id;

    // ✅ `movie_id`가 있을 때만 요청
    const { data: trailerData, isLoading: isTrailerLoading, error: trailerError } = useMovieTrailerQuery(movie_id, {
        enabled: !!movie_id, // ✅ movie_id 없으면 요청하지 않음
    });
    const { data: trailerDataSelect} = useMovieTrailerQuery(select_movie_id, {
        enabled: !!select_movie_id,
    });
    

    // 🎥 `type`이 "Trailer"이고 `site`가 "YouTube"인 영상만 필터링
    const trailer = trailerData?.results?.find(
        video => video.type === "Trailer" && video.site === "YouTube"
    );
    const trailerSelect = trailerDataSelect?.results?.find
    (video => video.type === "Trailer" && video.site === "YouTube");

    const [showVideo, setShowVideo] = useState(true);

   
    // ✅ 로딩 및 에러 처리
    if (isPopularLoading || isTrailerLoading) return <h1>Loading...</h1>;
    if (isError) return <Alert variant='danger'>인기 영화를 불러오는 중 오류 발생: {error.message}</Alert>;
    if (trailerError) return <Alert variant='danger'>예고편을 불러오는 중 오류 발생: {trailerError.message}</Alert>;

    return (
        <div className="video-wrapper">
    {/* 🎬 예고편 자동 재생 */}
    <div className="player-container">
        {trailerSelect?.key ? (
            <ReactPlayer 
                url={`https://www.youtube.com/watch?v=${trailerSelect.key}`} 
                playing={true} 
                loop={false}
                muted={false}
                width="100%"
                height="100%"
                onEnded={() => { 
                    setShowVideo(false);
                    onVideoEnd();
                }}
                config={{
                    youtube: {
                        playerVars: { 
                            controls: 0,        
                            modestbranding: 1,  
                            rel: 0,            
                            showinfo: 0,       
                            fs: 0,             
                            iv_load_policy: 3,  
                            autoplay: 1,       
                            vq: 'hd1080'       
                        }
                    }
                }}
            />
        ) : trailer?.key ? (
            <ReactPlayer
                className="play"
                url={`https://www.youtube.com/watch?v=${trailer?.key}`} 
                playing={true}   
                loop={false}     
                muted={false}    
                width="100%"
                height="100%"    
                onEnded={() => { 
                    setShowVideo(false);
                    onVideoEnd();
                }}
                config={{
                    youtube: {
                        playerVars: { 
                            controls: 0,        
                            modestbranding: 1,  
                            rel: 0,            
                            showinfo: 0,       
                            fs: 0,             
                            iv_load_policy: 3,  
                            autoplay: 1,       
                            vq: 'hd1080'       
                        }
                    }
                }}
            />
        ) : (
            <Alert variant="warning">🎥 유효한 예고편을 찾을 수 없습니다.</Alert>
        )}
    </div>
</div>

    );
};

export default Banner_Video;
