import Database from 'better-sqlite3';
import { HierarchicalNSW } from 'hnswlib-node';
import { phiNode } from '../lib/math/constants';

export interface MomentVector {
  phi_node: number;          // φ_node / 44
  zcm: [number, number, number];
  waiicode: number;          // scaled 0‑1
  beat: number;              // 0‑3
}

const db = new Database('spir1l.db');
db.pragma('journal_mode = WAL');

db.exec(`
CREATE TABLE IF NOT EXISTS moments (
  id INTEGER PRIMARY KEY,
  phi_node INTEGER,
  zcm0 REAL, zcm1 REAL, zcm2 REAL,
  waiicode INTEGER,
  beat INTEGER,
  dialogue TEXT,
  asset_ids TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

/* --------  HNSW setup  -------- */
const dim = 6;
const hnsw = new HierarchicalNSW('l2', dim);
let trained = false;

export function addMoment(input: Omit<MomentVector, 'phi_node'> & { birthDate: Date }) {
  const phi_node = phiNode(Math.floor(input.birthDate.getTime() / 86_400_000));
  const stmt = db.prepare(`
    INSERT INTO moments
      (phi_node, zcm0, zcm1, zcm2, waiicode, beat, dialogue, asset_ids)
    VALUES
      (@phi_node, @z0, @z1, @z2, @waiicode, @beat, @dialogue, @asset_ids)
  `);
  stmt.run({
    phi_node,
    z0: input.zcm[0], z1: input.zcm[1], z2: input.zcm[2],
    waiicode: input.waiicode,
    beat: input.beat,
    dialogue: (input as any)['dialogue'] ?? null,
    asset_ids: JSON.stringify((input as any)['asset_ids'] ?? []),
  });

  const vec = [
    phi_node / 44,
    ...input.zcm,
    input.waiicode / 99999,
    input.beat / 4,
  ];
  if (!trained) {
    hnsw.initIndex(10_000);   // max items
    trained = true;
  }
  hnsw.addPoint(vec, hnsw.getCurrentCount());
}

export function nearest(vec: number[], k = 5) {
  if (!trained) return [];
  return hnsw.searchKnn(vec, k).neighbors;
}
