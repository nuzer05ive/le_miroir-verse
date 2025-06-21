type Role = 'Whisper' | 'Angle' | 'Mask';
export interface GPTRequest { role: Role; content: string }

export async function askGPT(req: GPTRequest) {
  const systemPrompt = {
    Whisper: 'You are the spiritual guide of Spir1L\u2011OS\u2026',
    Angle:   'You are the mathematical oracle of Spir1L\u2011OS\u2026',
    Mask:    'You are the mythic narrator of Spir1L\u2011OS\u2026',
  }[req.role];

  // call your preferred OpenAI client / proxy
  const res = await fetch('/api/openai', {
    method: 'POST',
    body: JSON.stringify({ systemPrompt, content: req.content }),
  });
  return res.json() as Promise<{ reply: string }>;
}
