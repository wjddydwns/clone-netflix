// src/App.js
import './App.css';
import AppLayout from './Layout/AppLayout';
import { Routes, Route, useLocation } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import MoviePage from './pages/Movies/MoviePage';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import StartPage from './pages/Login/StartPage';

function App() {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <>
      {/* 📌 기본 라우팅 */}
      <Routes location={background || location}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<StartPage />} />
          <Route path="/browse" element={<Homepage />} />
          <Route path="/browse/movies">
            <Route index element={<MoviePage />} />
            <Route path="/browse/movies/:select_movie_id" element={<MovieDetail />} />
          </Route>
          {/* 404 페이지 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      {/* 📌 모달 라우팅 */}
      {background && (
        <Routes>
          <Route path="/browse/movies/:select_movie_id" element={<MovieDetail />} />
        </Routes>
      )}
    </>
  );
}

export default App;
