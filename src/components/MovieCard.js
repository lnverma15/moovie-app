import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  width: 200px;
  margin: 20px;
  text-align: center;
`;

const MovieCard = ({ movie }) => {
  return (
    <Card>
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
        />
        <h3>{movie.title}</h3>
        <p>{movie.release_date.split('-')[0]}</p>
      </Link>
    </Card>
  );
};

export default MovieCard;
