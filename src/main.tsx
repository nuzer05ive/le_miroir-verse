import "aframe";
import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

// List of VR selector surfaces and their properties
const cases = [
  { label: "PDF Surface", route: "/pdf", position: "-2 1.6 -4", color: "#cbd5e1" },
  { label: "Audio Surface", route: "/audio", position: "0 1.6 -4", color: "#a7f3d0" },
  { label: "ScrollOS", route: "/scroll", position: "2 1.6 -4", color: "#fca5a5" },
  { label: "VR Surface", route: "/vr", position: "4 1.6 -4", color: "#fde68a" },
  { label: "PhiField", route: "/scrollfield", position: "-4 1.6 -4", color: "#818cf8" },
  { label: "NFT Surface", route: "/nft", position: "-2 0.1 -4", color: "#f9a8d4" },
  { label: "QR Surface", route: "/qr", position: "2 0.1 -4", color: "#fef08a" }
];

const VRSelection = () => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register the navigation component ONCE (A-Frame native navigation)
    if (!(window as any).AFRAME.components["route-navigate"]) {
      (window as any).AFRAME.registerComponent("route-navigate", {
        schema: { route: { type: 'string' } },
        init: function () {
          this.el.addEventListener("click", () => {
            window.location.href = this.data.route;
          });
          this.el.addEventListener("mouseenter", () => {
            this.fuseTimeout = setTimeout(() => {
              window.location.href = this.data.route;
            }, 1200);
          });
          this.el.addEventListener("mouseleave", () => {
            if (this.fuseTimeout) clearTimeout(this.fuseTimeout);
          });
        }
      });
    }

    if (!sceneRef.current) return;
    sceneRef.current.innerHTML = `
      <a-scene embedded style="width:100vw;height:100vh;background:#18181b;">
        <a-entity id="rig">
          <a-camera position="0 1.6 2">
            <a-cursor fuse="true" fuse-timeout="1200" color="#facc15"></a-cursor>
          </a-camera>
        </a-entity>
        ${cases.map(
          (c) => `
            <a-box 
              position="${c.position}"
              depth="0.25" height="1.1" width="1.1"
              color="${c.color}"
              route-navigate="route: ${c.route}"
              material="shader: standard; emissive: #facc15; emissiveIntensity: 0.13"
              >
                <a-text
                  value="${c.label}"
                  align="center"
                  position="0 0.7 0.12"
                  color="#1e293b"
                  width="2"
                ></a-text>
            </a-box>
          `
        ).join("")}
        <a-sky color="#18181b"></a-sky>
      </a-scene>
    `;

    return () => {
      if (sceneRef.current) sceneRef.current.innerHTML = "";
    };
  }, []);

  return (
    <div ref={sceneRef} style={{ width: "100vw", height: "100vh", background: "#18181b" }} />
  );
};

const MainApp = () => (
  <React.StrictMode>
    <VRSelection />
  </React.StrictMode>
);

const container = document.getElementById("root");
if (container) createRoot(container).render(<MainApp />);