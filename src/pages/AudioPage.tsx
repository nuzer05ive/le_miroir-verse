import React, { useEffect } from "react";
import { phiSwells } from "../lib/audio-spiral/phiSwell";
// TODO: Wire up Tone.js, ZCM state

export default function AudioPage() {
  useEffect(() => {
    const interval = setInterval(() => {
      const t = Date.now() / 1000;
      const zcm = 1.0; // TODO: replace with real ZCM source
      phiSwells(zcm, t);
    }, 43);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Audio Surface</h2>
      <div className="border rounded p-8 text-center text-gray-500">
        <p>Audio player & spiral shader coming soon.</p>
      </div>
    </div>
  );
}