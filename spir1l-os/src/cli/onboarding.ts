import { assignPhiNode, zcmColor } from '../math/phi';
import { makeAvatar } from './avatar';

export interface OnboardingData {
  birthday: string;         // ISO‑8601
  intent: string;
  mood: string;
  favoriteColor: string;
}

export function runOnboarding(prompt: (q: string) => Promise<string>) {
  return Promise.all([
    prompt('\ud83d\udcc5  Enter your birth‑date (YYYY‑MM‑DD):'),
    prompt('\u2728  What brings you to Sp\u2019r1L‑OS today?'),
    prompt('\ud83c\udf9d  Current mood in one word:'),
    prompt('\ud83c\udfa8  Favourite colour (CSS value):'),
  ]).then(async ([birthday, intent, mood, favoriteColor]) => {
    const \u03c6Node = assignPhiNode(new Date(birthday));
    const avatar = await makeAvatar({ mood, favoriteColor, \u03c6Node });
    console.info(`\u2192  Welcome! You are \u03c6‑node ${\u03c6Node}.`, { avatar });
    return { birthday, intent, mood, favoriteColor } satisfies OnboardingData;
  });
}
