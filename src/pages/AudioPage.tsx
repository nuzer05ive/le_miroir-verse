import React, { useEffect, useRef } from 'react';
import * as Tone from 'tone';

export default function AudioPage() {
  const startedRef = useRef(false);

  const startAudio = async () => {
    if (!startedRef.current) {
      await Tone.start();
      console.log('Audio context started');
      // Example: Create a simple synth
      const synth = new Tone.Synth().toDestination();
      synth.triggerAttackRelease('C4', '8n');
      startedRef.current = true;
    }
  };

  useEffect(() => {
    // Possibly visualize amplitude using Three.js or etc.
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Audio Loader</h1>
      <button onClick={startAudio} className="bg-blue-500 text-white px-3 py-1 rounded">
        Play a note
      </button>
      <div className="mt-4 border border-gray-300 h-64 flex items-center justify-center">
        <p>Audio Visualizer Placeholder</p>
      </div>
    </main>
  );
}
