import { createMachine, assign } from 'xstate';

interface ScrollContext {
  zcm: number;
  scrollId?: string;
}

type ScrollEvent =
  | { type: 'ZCM_UPDATE'; zcm: number }
  | { type: 'APPROVE' }
  | { type: 'MINT' }
  | { type: 'ACK' }
  | { type: 'ZCM_ERROR' };

export const scrollMachine = createMachine<ScrollContext, ScrollEvent>({
  id: 'scroll',
  initial: 'draft',
  context: {
    zcm: 0,
    scrollId: ''
  },
  states: {
    draft: {
      on: {
        ZCM_UPDATE: [
          {
            cond: 'highEnough',
            target: 'reviewed',
            actions: 'setZcm'
          },
          {
            actions: 'setZcm'
          }
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
        onDone: 'reflected',
        onError: 'draft'
      }
    },
    reflected: {
      on: { ACK: 'archived' }
    },
    archived: {
      type: 'final'
    }
  }
},
{
  guards: {
    highEnough: (ctx, e) => e.type === 'ZCM_UPDATE' && e.zcm >= 0.15
  },
  actions: {
    setZcm: assign({ zcm: (_, e) => e.type === 'ZCM_UPDATE' ? e.zcm : 0 })
  },
  services: {
    genReflection: async (ctx) => {
      // pretend to generate reflection data
      return { success: true };
    }
  }
});
