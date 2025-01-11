import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL, API_TOKEN } from '../../api/config';
import MovieList from '../../components/MovieList/MovieList';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const url = `${API_BASE_URL}/trending/movie/day`;
      const options = {
        headers: {
          Authorization: API_TOKEN,
        },
      };

      try {
        const response = await axios.get(url, options);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
}