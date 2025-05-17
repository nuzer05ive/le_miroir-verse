import React, { useEffect, useRef } from "react";
// TODO: Integrate A-Frame, Three.js, custom GLSL, aframe-router

export default function VrPage() {
  // Placeholder for A-Frame scene
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically import A-Frame and setup scene here
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">VR Surface</h2>
      <div ref={sceneRef} className="w-full h-96 bg-black rounded-lg flex items-center justify-center text-gray-300">
        <p>VR experience loading soon.</p>
      </div>
      {/* Exit button, SOPHIA sprite, etc. */}
    </div>
  );
}