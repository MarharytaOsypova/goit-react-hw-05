import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { API_BASE_URL, API_TOKEN } from '../../api/config';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
    const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      fetchMovies(query);
    }
  }, [query]);

  const fetchMovies = async searchQuery => {
    setLoading(true);  
    setError(null);
    const url = `${API_BASE_URL}/search/movie?query=${searchQuery}`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: API_TOKEN,
        },
      });
      setMovies(response.data.results);
    } catch (error) {
       setError('Error fetching search results');
      console.error('Error fetching search results:', error);
    }finally {
      setLoading(false);  
    }
  };

  const handleSearch =   event => {
    event.preventDefault();
    const searchQuery = event.target.elements.query.value.trim();

    if (!searchQuery) {
      return;
    }

    setSearchParams({ query: searchQuery });
     
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSearch}>
        <input className={styles.input} type="text" name="query" defaultValue={query} />
        <button type="submit" disabled={loading}>Search</button>
      </form>
       {loading && <p>Loading...</p>}  
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
}