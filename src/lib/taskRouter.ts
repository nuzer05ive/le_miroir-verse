import { phiC } from '../lib/zcm';

export function routeTasksFromIPEARL(sCore: any, pilotHarmonic?: number[]): any[] {
  const { id: ipearlId, format_manifest, bloomWeight = 0.618, recursion_depth: R, entropy_cleared_bits: H_i, harmonic_vector: h_i } = sCore.meta;

  const tauZcm = 0.10 + 0.05 * (1 - Math.exp(-R));
  const now = new Date().toISOString();
  const phiAmp = phiC(R);
  const Nf = format_manifest.length;
  const baseC = phiAmp * (1 + H_i) * Nf;
  const kappa = pilotHarmonic ? harmonicSimilarity(pilotHarmonic, h_i) : -1;

  return format_manifest.map((entry: any) => ({
    id: crypto.randomUUID(),
    ipearlId,
    artifactType: entry.type,
    targetFilename: entry.target,
    bloomWeight,
    zcmThreshold: tauZcm,
    complexity: baseC,
    pilotCompatibility: kappa,
    status: 'unclaimed',
    createdAt: now,
  }));
}

function harmonicSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
  const normB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
  return dot / (normA * normB);
}