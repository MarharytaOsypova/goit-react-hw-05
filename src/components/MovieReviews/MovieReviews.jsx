import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, API_TOKEN } from '../../api/config';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      const url = `${API_BASE_URL}/movie/${movieId}/reviews`;

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: API_TOKEN,
          },
        });
        setReviews(response.data.results);
      } catch (error) {
        console.error('Error fetching movie reviews:', error);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

   if (reviews.length === 0) {
    return <p>No reviews available.</p>;
  }

  return (
    <ul>
      {reviews.map(review => (
        <li key={review.id}>
          <h3>Author: {review.author}</h3>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}