import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const IndexPage = lazy(() => import("./pages/IndexPage"));
const PdfPage = lazy(() => import("./pages/PdfPage"));
const AudioPage = lazy(() => import("./pages/AudioPage"));
const ScrollPage = lazy(() => import("./pages/ScrollPage"));
const NftPage = lazy(() => import("./pages/NftPage"));
const QrPage = lazy(() => import("./pages/QrPage"));
const VrPage = lazy(() => import("./pages/VrPage"));
const ScrollFieldViewer = lazy(() => import("./pages/ScrollFieldViewer"));

export default function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading…</div>}>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/pdf" element={<PdfPage />} />
          <Route path="/audio" element={<AudioPage />} />
          <Route path="/scroll" element={<ScrollPage />} />
          <Route path="/nft" element={<NftPage />} />
          <Route path="/qr" element={<QrPage />} />
          <Route path="/vr" element={<VrPage />} />
          <Route path="/scrollfield" element={<ScrollFieldViewer />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}