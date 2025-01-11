import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, API_TOKEN } from '../../api/config';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieCast = async () => {
      const url = `${API_BASE_URL}/movie/${movieId}/credits`;

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: API_TOKEN,
          },
        });
        setCast(response.data.cast);
      } catch (error) {
        console.error('Error fetching movie cast:', error);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  return (
    <ul>
      {cast.map(actor => (
        <li key={actor.id}>
          <p>{actor.name}</p>
          {actor.profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
            />
          )}
        </li>
      ))}
    </ul>
  );
}