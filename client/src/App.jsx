import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GamePlatform from './pages/GamePlatform';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/game" element={<GamePlatform />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;