import React, { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import { phiSwells } from "../lib/audio-spiral/phiSwell";

export default function AudioPage() {
  const [zcm, setZcm] = useState(1.0);
  const synthRef = useRef<Tone.Synth | null>(null);
  const gainRef = useRef<Tone.Gain | null>(null);
  const [playing, setPlaying] = useState(false);

  // Set up Tone.js synth and gain node on mount
  useEffect(() => {
    const synth = new Tone.Synth().toDestination();
    const gain = new Tone.Gain(0.6).toDestination();
    synth.connect(gain);

    synthRef.current = synth;
    gainRef.current = gain;

    return () => {
      synth.dispose();
      gain.dispose();
    };
  }, []);

  // Spiral-based ZCM modulator
  useEffect(() => {
    if (!playing) return;
    let tick = 0;
    const interval = setInterval(() => {
      const t = Date.now() / 1000;
      const newZcm = 0.72 + 0.25 * Math.abs(Math.sin(t / 2));
      setZcm(newZcm);

      if (synthRef.current && gainRef.current) {
        const note = ["C4", "E4", "G4", "B4", "D5"][(tick % 5)];
        synthRef.current.triggerAttackRelease(note, "8n");
        gainRef.current.gain.linearRampTo(newZcm * 0.7, 0.2);
        phiSwells(newZcm, t);
      }
      tick++;
    }, 430);

    return () => clearInterval(interval);
  }, [playing]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Audio Surface</h2>
      <div className="mb-4 text-gray-700">
        ZCM: <span className="font-mono">{zcm.toFixed(3)}</span>
      </div>
      <div className="flex gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded bg-blue-500 text-white ${playing ? "opacity-60" : ""}`}
          disabled={playing}
          onClick={async () => {
            await Tone.start();
            setPlaying(true);
          }}
        >
          {playing ? "Playing…" : "Start Spiral Audio"}
        </button>
        {playing && (
          <button
            className="px-4 py-2 rounded bg-gray-300 text-gray-900"
            onClick={() => setPlaying(false)}
          >
            Stop
          </button>
        )}
      </div>
      <div className="border rounded p-8 text-center text-gray-500 bg-black/80">
        <p>
          <span className="font-mono text-cyan-300">Phi</span>-modulated spiral synth.<br />
          ZCM modulates spiral sound and gain.
        </p>
      </div>
    </div>
  );
}