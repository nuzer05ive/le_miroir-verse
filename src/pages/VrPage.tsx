import React, { useEffect, useRef } from "react";

export default function VrPage() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let aframeScript: HTMLScriptElement | undefined;
    if (!(window as any).AFRAME) {
      aframeScript = document.createElement("script");
      aframeScript.src = "https://unpkg.com/aframe@1.5.0/dist/aframe.min.js";
      aframeScript.onload = setupVrScene;
      document.body.appendChild(aframeScript);
    } else {
      setupVrScene();
    }

    function setupVrScene() {
      if (!sceneRef.current) return;
      sceneRef.current.innerHTML = `
        <a-scene embedded style="width: 100%; height: 100%;">
          <a-entity 
            geometry="primitive: plane; height: 2; width: 3"
            position="0 1.6 -3"
            material="shader: flat; color: #fff"
            coherence-wave
          ></a-entity>
          <a-camera position="0 1.6 0"></a-camera>
          <a-sky color="#18181b"></a-sky>
        </a-scene>
      `;

      // Register coherence-wave shader
      if ((window as any).AFRAME && !(window as any).AFRAME.shaders["coherence-wave"]) {
        (window as any).AFRAME.registerShader("coherence-wave", {
          schema: {
            uTime: { type: "time", is: "uniform" },
            uZCM: { type: "number", is: "uniform", default: 1.0 }
          },
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
            }
          `,
          fragmentShader: `
            uniform float uTime;
            uniform float uZCM;
            varying vec2 vUv;
            void main() {
              float r = length(vUv - 0.5);
              float a = atan(vUv.y - 0.5, vUv.x - 0.5) + uTime * 0.2;
              float waves = sin(10.0 * r - 6.283 * a);
              float ring = smoothstep(0.48, 0.5, abs(waves));
              float brightness = mix(0.0, ring, uZCM);
              gl_FragColor = vec4(brightness, brightness, 1.0, 1.0);
            }
          `,
        });
      }
    }

    return () => {
      if (aframeScript) document.body.removeChild(aframeScript);
      if (sceneRef.current) sceneRef.current.innerHTML = "";
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">VR Surface</h2>
      <div
        ref={sceneRef}
        className="w-full h-96 bg-black rounded-lg flex items-center justify-center text-gray-300"
        style={{ minHeight: 384, minWidth: 512 }}
      >
        <p>If you see this, VR is loading…</p>
      </div>
      <div className="mt-4 text-xs text-gray-400">
        VR surface uses A-Frame and spiral shader<br />
        <a href="https://aframe.io/" className="underline" target="_blank" rel="noopener noreferrer">A-Frame docs</a>
      </div>
    </div>
  );
}