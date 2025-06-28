import React from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GamePlatform from './pages/GamePlatform';
import AdminPage from './pages/AdminPage';
import ReferralLanding from './pages/ReferralLanding';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/ref/:referralCode" element={<ReferralLanding />} />
      <Route path="/game" element={<GamePlatform />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;