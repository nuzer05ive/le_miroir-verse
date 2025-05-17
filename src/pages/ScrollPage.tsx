import React, { useEffect, useRef, useState } from "react";
import { useMachine } from "@xstate/react";
import { scrollMachine } from "../lib/scroll/fsm";
import ScrollFieldViewer from "./ScrollFieldViewer";

/**
 * ScrollOS: finite-scroll state machine with ZCM, reflection, and spiral overlay.
 */
export default function ScrollPage() {
  const [current, send] = useMachine(scrollMachine, {
    context: { zcm: 0.0, scrollId: "demo-0001" },
  });
  const [inputValue, setInputValue] = useState("");

  // Simulate ZCM update (connect real ZCM signal in prod)
  useEffect(() => {
    const interval = setInterval(() => {
      const zcm = 0.13 + 0.08 * Math.abs(Math.sin(Date.now() / 2222));
      send({ type: "ZCM_UPDATE", zcm });
    }, 900);
    return () => clearInterval(interval);
  }, [send]);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">ScrollOS (FSM)</h2>
      <div className="mb-4">
        <strong>Current State:</strong>{" "}
        <span className="px-2 py-1 bg-blue-100 rounded">{current.value as string}</span>
        <span className="ml-6 text-gray-500">ZCM: {(current.context.zcm).toFixed(3)}</span>
      </div>
      <div className="flex gap-2 mb-6">
        {current.matches("reviewed") && (
          <button className="btn" onClick={() => send("APPROVE")}>Approve</button>
        )}
        {current.matches("mintReady") && (
          <button className="btn" onClick={() => send("MINT")}>Mint</button>
        )}
        {current.matches("reflected") && (
          <button className="btn" onClick={() => send("ACK")}>Acknowledge</button>
        )}
      </div>
      <div className="mb-6">
        <label className="block font-mono mb-1">Reflective Prompt:</label>
        <input
          className="w-full border px-2 py-1 rounded"
          placeholder="Type your reflection…"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
      </div>
      <ScrollFieldViewer />
    </div>
  );
}