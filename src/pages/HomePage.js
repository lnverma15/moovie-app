import React, { useState } from 'react';
 import MovieList from '../components/MovieList';

const HomePage = () => {
  const [query, setQuery] = useState('');

  return (
    <div>
       <MovieList query={query} />
    </div>
  );
};

export default HomePage;
