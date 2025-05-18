import React, { useEffect } from 'react';
// Example VR scene with A-Frame. 
// Make sure to include <script src="aframe.min.js"></script> in index.html or import globally.

export default function VrPage() {
  useEffect(() => {
    // Any A-Frame or Three-based initialization can go here
  }, []);

  const exitVr = () => {
    // Example: route back
    window.location.hash = '#/';
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* A-Frame canvas/scene */}
      <a-scene embedded style={{ width: '100%', height: '100%' }}>
        <a-entity position="0 1.6 0">
          <a-camera>
            <a-cursor></a-cursor>
          </a-camera>
        </a-entity>

        {/* Portal gate or mirror hall placeholder */}
        <a-entity id="portal" visible="false" position="0 1.5 -4">
          <a-ring color="#ff6fe6" radius-inner="0.4" radius-outer="0.6"
                  animation__open="property: scale; dir: normal; dur: 1200; to: 3 3 3; startEvents: open-portal">
          </a-ring>
        </a-entity>

      </a-scene>

      <button
        onClick={exitVr}
        style={{ position: 'absolute', top: 20, left: 20, zIndex: 999 }}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Exit VR
      </button>
    </div>
  );
}
