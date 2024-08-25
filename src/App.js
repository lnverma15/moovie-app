import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage';

const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/movie/:id" element={<MovieDetailsPage />} />
  </Routes>
);

export default App;
