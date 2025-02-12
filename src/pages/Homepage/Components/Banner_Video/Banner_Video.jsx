import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import ReactPlayer from "react-player";
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMoviesQuery';
import api from "../../../../utils/api"; // ✅ axios 인스턴스 가져오기
import './BannerVideo.style.css';

const Banner_Video = ({ onVideoEnd }) => {
    // 🎬 인기 영화 가져오기
    const { data: popularData, isLoading: isPopularLoading, isError: isPopularError, error: popularError } = usePopularMoviesQuery();

    // ✅ 예고편 데이터를 저장할 상태 생성
    const [trailerKey, setTrailerKey] = useState(null);
    const [isTrailerLoading, setIsTrailerLoading] = useState(true);
    const [trailerError, setTrailerError] = useState(null);
    const [showVideo, setShowVideo] = useState(true); // 🎬 동영상 표시 여부

    useEffect(() => {
        // 🎬 첫 번째 인기 영화의 ID 가져오기
        const movieId = popularData?.results?.[0]?.id;
        if (movieId) {
            fetchMovieTrailers(movieId);
        }
    }, [popularData]);

    // ✅ API 요청을 직접 호출하는 함수
    const fetchMovieTrailers = async (movieId) => {
        try {
            const response = await api.get(`/movie/${movieId}/videos?language=ko`);
            const trailers = response.data.results;
            
            if (trailers.length > 0) {
                setTrailerKey(trailers[0]?.key); // ✅ 첫 번째 예고편 선택
            } else {
                setTrailerKey(null); // ✅ 예고편이 없을 경우
            }
        } catch (error) {
            setTrailerError(error.message);
        } finally {
            setIsTrailerLoading(false);
        }
    };

    if (isPopularLoading || isTrailerLoading) return <h1>Loading...</h1>;
    if (isPopularError) return <Alert variant='danger'>{popularError.message}</Alert>;
    if (trailerError) return <Alert variant='danger'>{trailerError}</Alert>;

    return (
        <div className="video-wrapper" style={{ display: showVideo ? 'block' : 'none' }}>
            {/* 🎬 예고편 자동 재생 */}
            {trailerKey ? (
                <div className="player-container">
                    <ReactPlayer
                        className="play"
                        url={`https://www.youtube.com/watch?v=${trailerKey}`} // TMDB에서 가져온 YouTube 예고편
                        playing={true}  // 자동 재생
                        loop={false}    // 반복 재생 OFF (한 번만 재생)
                        muted={true}    // 음소거 (자동 재생 가능하게)
                        width="100%"
                        height="100%"  // 부모 div 크기에 맞게 자동 조정
                        onEnded={() => { 
                            setShowVideo(false);  // 🔥 동영상이 끝나면 숨김
                            onVideoEnd(); // 🔥 부모 컴포넌트(Banner)에서 상태 변경
                        }}
                        config={{
                            youtube: {
                                playerVars: { 
                                    controls: 0, // ✅ 재생 바 숨김
                                    modestbranding: 1, // ✅ YouTube 로고 제거
                                    rel: 0, // ✅ 관련 동영상 표시 안 함
                                    showinfo: 0, // ✅ 비디오 정보 숨김
                                    fs: 0, // ✅ 전체 화면 버튼 제거
                                    iv_load_policy: 3, // ✅ 자막 & 인터랙티브 요소 제거
                                    autoplay: 1, // ✅ 자동 재생
                                    vq: 'hd2160' // ✅ 4K 화질 고정
                                }
                            }
                        }}
                        style={{
                            pointerEvents: 'none' // ✅ 클릭 방지 (유저 조작 X)
                        }}
                    />
                </div>
            ) : (
                <Alert variant="warning">예고편을 찾을 수 없습니다.</Alert>
            )}
        </div>
    );
}

export default Banner_Video;
