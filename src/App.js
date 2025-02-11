import './App.css';
import AppLayout from './Layout/AppLayout';
import { Routes ,Route} from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import MoviePage from './pages/Movies/MoviePage';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/Login/LoginPage';


function App() {

  // 홈페이지
  // 영화 전페보여조는 홈페이지 (search) /movies/q=?
  // 영화 디테일 페이지 /movies/:id
  // 추쳔 영화 /movies/:id/recommandation
  // 리뷰 /movies/:id/reviews
  return (
<Routes>
  <Route element={<AppLayout />}>
    <Route path="/" element={<LoginPage />} />
    <Route path="/browse" element={<Homepage />} />
    <Route path="/movies">
      <Route index element={<MoviePage />} />
      <Route path=":id" element={<MovieDetail />} />
    </Route>
    {/* 404 페이지 */}
    <Route path="*" element={<NotFoundPage />} />
  </Route>
</Routes>


  );
}

export default App;
