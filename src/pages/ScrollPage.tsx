import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { scrollMachine } from '../lib/scrollMachine';

export default function ScrollPage() {
  const [state, send] = useMachine(scrollMachine);

  useEffect(() => {
    // Example: dispatch a ZCM_UPDATE event
    send({ type: 'ZCM_UPDATE', zcm: 0.16 });
  }, [send]);

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Scroll Loader</h1>
      <p>Current state: {state.value.toString()}</p>
      <div className="mt-4 space-x-2">
        {state.matches('reviewed') && (
          <button onClick={() => send('APPROVE')} className="bg-blue-500 text-white px-3 py-1 rounded">
            Approve
          </button>
        )}
        {state.matches('mintReady') && (
          <button onClick={() => send('MINT')} className="bg-green-500 text-white px-3 py-1 rounded">
            Mint
          </button>
        )}
        {state.matches('reflected') && (
          <button onClick={() => send('ACK')} className="bg-purple-500 text-white px-3 py-1 rounded">
            Ack
          </button>
        )}
      </div>
    </main>
  );
}
