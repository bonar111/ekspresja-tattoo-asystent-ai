// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import ArtistPortfolioPage from './pages/ArtistPortfolioPage';
import BlogPage from './pages/BlogPage';
import SalePage from './pages/SalePage';
import QuotePage from './pages/QuotePage';

const App: React.FC = () => {
  return (
    <Routes>
      {/* wspólny layout (header/footer) */}
      <Route path="/" element={<Layout />}>
        {/* strona główna */}
        <Route index element={<HomePage />} />
        <Route path="sale" element={<SalePage />} />

        {/* strona z portfolio */}
        <Route path="team" element={<TeamPage />} />
        <Route path="artist/:id" element={<ArtistPortfolioPage />} />
        <Route path="blog" element={<BlogPage />} />

        {/* wyceniarka*/}
        <Route path="wycena" element={<QuotePage />} />

        {/* „catch-all” – przekieruj wszystko inne na stronę główną */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
