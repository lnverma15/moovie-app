
import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../services/api';
import styled from 'styled-components';

// Styled Components
const MovieContainer = styled.div`
  padding: 20px;
  background-color: #121212;
  color: #ffffff;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #ffbb00;
`;

const SearchBar = styled.input`
  display: block;
  width: 60%;
  margin: 0 auto 40px;
  padding: 10px 15px;
  font-size: 1.2rem;
  border-radius: 5px;
  border: 1px solid #333;
  background-color: #1c1c1c;
  color: #ffffff;
  outline: none;

  &:focus {
    border-color: #ffbb00;
  }
`;

const MovieList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  list-style: none;
  padding: 0;
`;

const MovieItem = styled.li`
  background-color: #1c1c1c;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  max-width: 300px;
  position: relative;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  }
`;

const MovieImage = styled.img`
  width: 100%;
  height: 450px;
  object-fit: cover;
  display: block;
  transition: opacity 0.3s ease;

  ${MovieItem}:hover & {
    opacity: 0.8;
  }
`;

const MovieInfo = styled.div`
  padding: 15px;
  text-align: center;
`;

const MovieTitle = styled.h2`
  font-size: 1.5rem;
  margin: 10px 0;
`;

const MovieDate = styled.p`
  font-size: 1rem;
  margin: 0 0 15px;
  color: #bbbbbb;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 15px 15px;
`;

const FavoriteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;

  svg {
    fill: ${props => (props.favorited ? '#ff0000' : '#ffffff')};
    transition: fill 0.3s ease;
  }

  &:hover svg {
    fill: #ff0000;
  }
`;

const WatchButton = styled.a`
  background-color: #ffbb00;
  border: none;
  color: #000000;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;

  &:hover {
    background-color: #ff8800;
  }
`;

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const moviesData = await fetchMovies(searchQuery);
        setMovies(moviesData);
      } catch (error) {
        console.error('Error loading movies:', error);
      }
    };

    loadMovies();
  }, [searchQuery]);

  const handleFavoriteToggle = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  const generateYouTubeLink = (title) => {
    const searchQuery = encodeURIComponent(title + ' trailer');
    return `https://www.youtube.com/results?search_query=${searchQuery}`;
  };

  return (
    <MovieContainer>
      <Title>Movie Munch</Title>
      <SearchBar
        type="text"
        placeholder="Search for a movie..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <MovieList>
        {movies.map((movie) => (
          <MovieItem key={movie.id}>
            <MovieImage src={movie.image} alt={movie.title} />
            <MovieInfo>
              <MovieTitle>{movie.title}</MovieTitle>
              <MovieDate>{movie.release_date}</MovieDate>
              <ButtonsContainer>
                <FavoriteButton
                  favorited={favorites.includes(movie.id)}
                  onClick={() => handleFavoriteToggle(movie.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </FavoriteButton>
                <WatchButton href={generateYouTubeLink(movie.title)} target="_blank">
                  Watch
                </WatchButton>
              </ButtonsContainer>
            </MovieInfo>
          </MovieItem>
        ))}
      </MovieList>
    </MovieContainer>
  );
};

export default MoviePage;
