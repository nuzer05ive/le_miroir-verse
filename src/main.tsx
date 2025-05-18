import "aframe";
import React, { Suspense, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useNavigate } from "react-router-dom";

const VRSelection = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const cases = [
    { label: "PDF Surface", route: "/pdf", position: "-2 1.6 -4", color: "#cbd5e1" },
    { label: "Audio Surface", route: "/audio", position: "0 1.6 -4", color: "#a7f3d0" },
    { label: "ScrollOS", route: "/scroll", position: "2 1.6 -4", color: "#fca5a5" },
    { label: "VR Surface", route: "/vr", position: "4 1.6 -4", color: "#fde68a" },
    { label: "PhiField", route: "/scrollfield", position: "-4 1.6 -4", color: "#818cf8" },
    { label: "NFT Surface", route: "/nft", position: "-2 0.1 -4", color: "#f9a8d4" },
    { label: "QR Surface", route: "/qr", position: "2 0.1 -4", color: "#fef08a" }
  ];

  useEffect(() => {
    let aframeScript: HTMLScriptElement | undefined;
    if (!(window as any).AFRAME) {
      aframeScript = document.createElement("script");
      aframeScript.src = "https://unpkg.com/aframe@1.5.0/dist/aframe.min.js";
      aframeScript.onload = setupScene;
      document.body.appendChild(aframeScript);
    } else {
      setupScene();
    }

    function setupScene() {
      if (!sceneRef.current) return;

      // Simple WASD walk controls (if not present)
      if (!(window as any).AFRAME.components["simple-walk-controls"]) {
        (window as any).AFRAME.registerComponent("simple-walk-controls", {
          schema: {},
          init: function () {
            this.direction = new (window as any).THREE.Vector3();
            this.speed = 0.07;
            window.addEventListener("keydown", (e: KeyboardEvent) => {
              if (e.code === "KeyW") this.direction.z = -1;
              if (e.code === "KeyS") this.direction.z = 1;
              if (e.code === "KeyA") this.direction.x = -1;
              if (e.code === "KeyD") this.direction.x = 1;
            });
            window.addEventListener("keyup", (e: KeyboardEvent) => {
              if (["KeyW", "KeyS"].includes(e.code)) this.direction.z = 0;
              if (["KeyA", "KeyD"].includes(e.code)) this.direction.x = 0;
            });
          },
          tick: function () {
            if (this.direction.lengthSq() > 0) {
              const el = this.el;
              const pos = el.object3D.position;
              pos.x += this.direction.x * this.speed;
              pos.z += this.direction.z * this.speed;
            }
          }
        });
      }

      // Add scene markup
      sceneRef.current.innerHTML = `
        <a-scene embedded style="width:100vw;height:100vh;background:#18181b;">
          <a-entity id="rig" simple-walk-controls>
            <a-camera position="0 1.6 2">
              <a-cursor fuse="true" fuse-timeout="1200" color="#facc15"></a-cursor>
            </a-camera>
          </a-entity>
          ${cases
            .map(
              (c, i) => `
              <a-box 
                position="${c.position}"
                depth="0.25" height="1.1" width="1.1"
                color="${c.color}"
                class="select-box"
                case-route="${c.route}"
                material="shader: standard; emissive: #facc15; emissiveIntensity: 0.13"
                event-set__enter="_event:mouseenter; color:#fcd34d"
                event-set__leave="_event:mouseleave; color:${c.color}"
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
            )
            .join("")}
          <a-sky color="#18181b"></a-sky>
        </a-scene>
      `;

      // Click/gaze to navigate
      setTimeout(() => {
        const boxes = sceneRef.current!.querySelectorAll(".select-box");
        boxes.forEach((box: any) => {
          box.addEventListener("click", () => {
            const route = box.getAttribute("case-route");
            if (route) navigate(route);
          });
        });
      }, 1200);
    }

    return () => {
      if (aframeScript) document.body.removeChild(aframeScript);
      if (sceneRef.current) sceneRef.current.innerHTML = "";
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div ref={sceneRef} style={{ width: "100vw", height: "100vh", background: "#18181b" }} />
  );
};

const MainApp = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading VR Gateway…</div>}>
      <VRSelection />
    </Suspense>
  </BrowserRouter>
);

const container = document.getElementById("root");
if (container) createRoot(container).render(<MainApp />);