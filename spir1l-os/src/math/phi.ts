export const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;
export const OMEGA = 0.000437;           // \u03c9 wobble

export function assignPhiNode(birthday: Date, mod = 44) {
  const epochDays = Math.floor(birthday.getTime() / 86_400_000);
  return Math.floor(epochDays * OMEGA) % mod;
}
