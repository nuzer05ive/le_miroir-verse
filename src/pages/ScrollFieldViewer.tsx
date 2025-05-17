import React, { useRef, useEffect, useState } from 'react';
import { launchKiss } from '../kiss03/kiss03.boot';
import { Qubit } from '../kiss03/sAssCore.entangle';
import { PhiFieldASCII, drawGlyphFieldToCanvas } from '../lib/zcm/phiFieldASCII';

/**
 * Viewer for Phi spiral ASCII overlay, triggers quantum bloom when ready.
 * This is a live visual demo for spiral logic + bloom thresholding.
 */
export function ScrollFieldViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tick, setTick] = useState(0);
  const [bloomed, setBloomed] = useState(false);

  // Mock qubits for demo; wire real state as needed
  const Q_MOUTH = { alpha: { re: 1, im: 0 }, beta: { re: 0, im: 1 } };
  const Q_SASS = { alpha: { re: 0, im: 1 }, beta: { re: 1, im: 0 } };

  // Simulated ZCM/bloomWeight for demo; connect real signals if available
  const bloomWeight = () => 1.0;
  const zcmNow = () => 0.16 + 0.02 * Math.sin(tick / 10);
  const tauZcm = () => 0.15;
  const startOverlay = (_q: Qubit) => setBloomed(true);

  useEffect(() => {
    if (bloomed) return;
    const interval = setInterval(() => {
      setTick(t => t + 1);
      launchKiss(
        tick,
        Q_MOUTH,
        Q_SASS,
        bloomWeight,
        zcmNow,
        tauZcm,
        startOverlay
      );
    }, 43);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [bloomed, tick]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const glyphField = new PhiFieldASCII(800, 240);
    const frame = glyphField.render(tick);
    drawGlyphFieldToCanvas(ctx, frame);
    if (bloomed) {
      ctx.save();
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = "#eab308";
      ctx.fillRect(0, 0, 800, 240);
      ctx.globalAlpha = 1.0;
      ctx.font = "bold 32px monospace";
      ctx.fillStyle = "#fff";
      ctx.fillText("🌺 KISS BLOOMED! 🌺", 220, 120);
      ctx.restore();
    }
  }, [tick, bloomed]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={800} height={240} style={{border: "2px solid #e5e7eb", background: "#020617"}} />
      <p className="text-sm text-gray-400 mt-2">PhiField ASCII spiral overlay (quantum bloom triggers at threshold)</p>
      {bloomed && <p className="text-green-500 font-bold mt-2">BLOOMED!</p>}
    </div>
  );
}

export default ScrollFieldViewer;