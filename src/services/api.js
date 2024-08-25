import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ghibliapi.vercel.app',
});

export const fetchMovies = async () => {
  try {
    const response = await api.get('/films');
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await api.get(`/films/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

// Since the Studio Ghibli API doesn't have genres, this function can be omitted or mocked if necessary.
export const fetchGenres = async () => {
  // You could return some mock genres if needed for filtering
  return ['Fantasy', 'Adventure', 'Drama'];
};
