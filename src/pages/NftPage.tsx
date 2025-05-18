import React from 'react';
// For real usage, set up wagmi, ethers, connect wallet, call ZCMScoreGate.mint

export default function NftPage() {
  const handleMint = async () => {
    console.log('Mint NFT placeholder');
    // TODO: integrate wagmi + Ethers
  };

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">NFT Loader</h1>
      <button onClick={handleMint} className="bg-blue-500 text-white px-3 py-1 rounded">
        Mint via ScoreGate
      </button>
      <div className="mt-4">
        <p>Placeholder sigil SVG from CID would appear here.</p>
      </div>
    </main>
  );
}
