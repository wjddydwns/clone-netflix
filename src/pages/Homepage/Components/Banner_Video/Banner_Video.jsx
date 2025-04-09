import React, { useState, useMemo, useCallback, memo } from 'react';
import Alert from 'react-bootstrap/Alert';
import ReactPlayer from "react-player";
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMoviesQuery';
import { useMovieTrailerQuery } from '../../../../hooks/useMovieTrailerQuery';
import './BannerVideo.style.css';

// Alert 컴포넌트 메모이제이션
const MemoizedAlert = memo(({ variant, children }) => (
  <Alert variant={variant}>{children}</Alert>
));

const Banner_Video = ({ onVideoEnd, select_movie_id }) => {
    // 🎬 인기 영화 가져오기
    const { data: popularData, isLoading: isPopularLoading, isError, error } = usePopularMoviesQuery();
    
    // movie_id를 useMemo로 최적화
    const movie_id = useMemo(() => popularData?.results?.[0]?.id, [popularData]);

    // ✅ `movie_id`가 있을 때만 요청
    const { data: trailerData, isLoading: isTrailerLoading, error: trailerError } = useMovieTrailerQuery(movie_id, {
        enabled: !!movie_id, // ✅ movie_id 없으면 요청하지 않음
    });
    
    const { data: trailerDataSelect } = useMovieTrailerQuery(select_movie_id, {
        enabled: !!select_movie_id,
    });
    
    // 트레일러 찾기 로직을 useMemo로 최적화
    const trailer = useMemo(() => 
        trailerData?.results?.find(
            video => video.type === "Trailer" && video.site === "YouTube"
        ),
        [trailerData]
    );
    
    const trailerSelect = useMemo(() => 
        trailerDataSelect?.results?.find(
            video => video.type === "Trailer" && video.site === "YouTube"
        ),
        [trailerDataSelect]
    );

    const [showVideo, setShowVideo] = useState(true);

    // 비디오 종료 핸들러를 useCallback으로 최적화
    const handleVideoEnd = useCallback(() => { 
        setShowVideo(false);
        onVideoEnd();
    }, [onVideoEnd]);
    
    // YouTube 플레이어 설정을 useMemo로 최적화
    const youtubeConfig = useMemo(() => ({
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
    }), []);
    
    // ReactPlayer 공통 props를 useMemo로 최적화
    const playerProps = useMemo(() => ({
        playing: true,
        loop: false,
        muted: false,
        width: "100%",
        height: "100%",
        onEnded: handleVideoEnd,
        config: youtubeConfig
    }), [handleVideoEnd, youtubeConfig]);

    // 트레일러 URL 생성 최적화
    const selectTrailerUrl = useMemo(() => 
        trailerSelect?.key ? `https://www.youtube.com/watch?v=${trailerSelect.key}` : null, 
        [trailerSelect]
    );
    
    const defaultTrailerUrl = useMemo(() => 
        trailer?.key ? `https://www.youtube.com/watch?v=${trailer.key}` : null, 
        [trailer]
    );

    // ✅ 로딩 및 에러 처리
    if (isPopularLoading || isTrailerLoading) return <h1>Loading...</h1>;
    if (isError) return <MemoizedAlert variant='danger'>인기 영화를 불러오는 중 오류 발생: {error.message}</MemoizedAlert>;
    if (trailerError) return <MemoizedAlert variant='danger'>예고편을 불러오는 중 오류 발생: {trailerError.message}</MemoizedAlert>;

    return (
        <div className="video-wrapper">
            <div className="player-container">
                {selectTrailerUrl ? (
                    <ReactPlayer 
                        url={selectTrailerUrl}
                        {...playerProps}
                    />
                ) : defaultTrailerUrl ? (
                    <ReactPlayer
                        className="play"
                        url={defaultTrailerUrl}
                        {...playerProps}
                    />
                ) : (
                    <MemoizedAlert variant="warning">🎥 유효한 예고편을 찾을 수 없습니다.</MemoizedAlert>
                )}
            </div>
        </div>
    );
};

// React.memo로 컴포넌트 자체를 메모이제이션
export default memo(Banner_Video);