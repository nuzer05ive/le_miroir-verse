import { generateUUID } from './utils';

export type ArtifactType = 'text' | 'audio' | 'pdf' | 'svg' | 'vr';

export interface SCoreMeta {
  id: string;
  format_manifest: { type: string; target: string }[];
  bloomWeight?: number;
  recursion_depth: number;
  entropy_cleared_bits: number;
  harmonic_vector?: number[];
}

export interface ArtifactTask {
  id: string;
  ipearlId: string;
  artifactType: ArtifactType;
  targetFilename: string;
  bloomWeight: number;
  zcmThreshold: number;
  complexity: number;
  pilotCompatibility: number;
  assignedTo?: string;
  status: 'unclaimed' | 'claimed' | 'submitted' | 'verified' | 'archived';
  createdAt: string;
}

export function harmonicSimilarity(hPilot: number[], hI: number[]) {
  if (!hPilot.length || !hI.length || hPilot.length !== hI.length) return -1;
  // example: dot product / (norms)
  const dot = hPilot.reduce((acc, val, i) => acc + val * hI[i], 0);
  const normA = Math.sqrt(hPilot.reduce((acc, val) => acc + val * val, 0));
  const normB = Math.sqrt(hI.reduce((acc, val) => acc + val * val, 0));
  return dot / (normA * normB);
}

export function phiC(R: number): number {
  // example placeholder
  return 1 / (1 + R);
}

export function routeTasksFromIPEARL(
  sCore: { meta: SCoreMeta },
  pilotHarmonic?: number[],
): ArtifactTask[] {
  const {
    id: ipearlId,
    format_manifest,
    bloomWeight = 0.618,
    recursion_depth: R,
    entropy_cleared_bits: H_i,
    harmonic_vector: h_i = []
  } = sCore.meta;

  const tauZcm = 0.10 + 0.05 * (1 - Math.exp(-R));
  const now = new Date().toISOString();
  const phiAmp = phiC(R);
  const N_f = format_manifest.length;
  const baseC = phiAmp * (1 + H_i) * N_f;
  const kappa = pilotHarmonic ? harmonicSimilarity(pilotHarmonic, h_i) : -1;

  return format_manifest.map((entry) => ({
    id: generateUUID(),
    ipearlId,
    artifactType: entry.type as ArtifactType,
    targetFilename: entry.target,
    bloomWeight,
    zcmThreshold: tauZcm,
    complexity: baseC,
    pilotCompatibility: kappa,
    status: 'unclaimed',
    createdAt: now
  }));
}
