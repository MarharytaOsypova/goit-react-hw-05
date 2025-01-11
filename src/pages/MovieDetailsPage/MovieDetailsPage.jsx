import { useParams, Link, Outlet, useNavigate,useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL, API_TOKEN } from '../../api/config';
import styles from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const previousLocation = location.state?.from || '/movies';
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      const url = `${API_BASE_URL}/movie/${movieId}`;

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: API_TOKEN,
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

    const handleGoBack = () => {
    navigate(previousLocation);
  };

return (
  <>
    <button onClick={handleGoBack}>Go back</button>


    <div className={styles.container}>
      <div className={styles.details}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>

   
      <div className={styles.info}>
        <h1>{movie.title} ({new Date(movie.release_date).getFullYear()})</h1>
        <h3>User Score: {movie.vote_average}%</h3>
        <h3>Overview</h3>
        <p>{movie.overview}</p>
        <h3>Genres: {movie.genres.map(genre => genre.name).join(', ')}</h3>
      </div>
    </div>

  
    <h2 className={styles.additional}>Additional information</h2>
    <ul>
      <li>
        <Link to="cast" state={{ from: previousLocation }}>Cast</Link>
      </li>
      <li>
        <Link to="reviews" state={{ from: previousLocation }}>Reviews</Link>
      </li>
    </ul>
    <Outlet />
  </>
);
}