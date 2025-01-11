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

  useEffect(() => {
    if (query) {
      fetchMovies(query);
    }
  }, [query]);

  const fetchMovies = async searchQuery => {
    const url = `${API_BASE_URL}/search/movie?query=${searchQuery}`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: API_TOKEN,
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleSearch = async event => {
    event.preventDefault();
    const searchQuery = event.target.elements.query.value.trim();

    if (!searchQuery) {
      return;
    }

    setSearchParams({ query: searchQuery });
    fetchMovies(searchQuery);
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSearch}>
        <input className={styles.input} type="text" name="query" defaultValue={query} />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
}