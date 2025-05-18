import React from 'react';
import { Routes, Route } from 'react-router-dom';

import IndexPage from './pages/IndexPage';
import PdfPage from './pages/PdfPage';
import AudioPage from './pages/AudioPage';
import ScrollPage from './pages/ScrollPage';
import NftPage from './pages/NftPage';
import QrPage from './pages/QrPage';
import VrPage from './pages/VrPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/pdf" element={<PdfPage />} />
      <Route path="/audio" element={<AudioPage />} />
      <Route path="/scroll" element={<ScrollPage />} />
      <Route path="/nft" element={<NftPage />} />
      <Route path="/qr" element={<QrPage />} />
      <Route path="/vr" element={<VrPage />} />
    </Routes>
  );
}

export default App;
