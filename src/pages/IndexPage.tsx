import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import LoaderCard from '../components/LoaderCard';

export default function IndexPage() {
  const [searchParams] = useSearchParams();
  const cid = searchParams.get('cid') || '';

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-3">Load your iPEARL</h1>
      {cid && <p>Pre-seeded CID: {cid}</p>}

      <div className="grid grid-cols-2 gap-4 mt-4 max-w-lg">
        <LoaderCard label="PDF" to="/pdf" />
        <LoaderCard label="Audio" to="/audio" />
        <LoaderCard label="Scroll" to="/scroll" />
        <LoaderCard label="NFT" to="/nft" />
        <LoaderCard label="QR" to="/qr" />
        <LoaderCard label="VR" to="/vr" />
      </div>
    </main>
  );
}
