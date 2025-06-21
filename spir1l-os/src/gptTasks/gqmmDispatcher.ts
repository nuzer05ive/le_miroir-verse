import { askGPT } from '../services/gptBridge';

export const triuneAsk = {
  whisper: (content: string) => askGPT({ role: 'Whisper', content }),
  angle:   (content: string) => askGPT({ role: 'Angle', content }),
  mask:    (content: string) => askGPT({ role: 'Mask', content }),
};
