import { createMachine, assign } from 'xstate';

interface ScrollContext {
  zcm: number;
  scrollId: string;
}

type ScrollEvent =
  | { type: 'ZCM_UPDATE'; zcm: number }
  | { type: 'APPROVE' }
  | { type: 'MINT' }
  | { type: 'ACK' };

export const scrollMachine = createMachine<ScrollContext, ScrollEvent>({
  id: 'scroll',
  initial: 'draft',
  context: { zcm: 0, scrollId: '' },
  states: {
    draft: {
      on: {
        ZCM_UPDATE: [
          { 
            cond: 'highEnough',
            target: 'reviewed',
            actions: 'setZcm'
          },
          { actions: 'setZcm' }
        ]
      }
    },
    reviewed: {
      on: { APPROVE: 'mintReady' }
    },
    mintReady: {
      on: { MINT: 'minted' }
    },
    minted: {
      invoke: {
        src: 'genReflection',
        onDone: 'reflected'
      }
    },
    reflected: {
      on: { ACK: 'archived' }
    },
    archived: { type: 'final' }
  }
}, {
  guards: {
    highEnough: (_, e) => e.zcm >= 0.15
  },
  actions: {
    setZcm: assign({ zcm: (_, e) => (e as any).zcm })
  },
  services: {
    genReflection: (ctx) => {
      // call some async reflection logic
      return Promise.resolve({ scrollId: ctx.scrollId });
    }
  }
});