export interface ScanfeastOrder {
  table: string;
  order: string;
  items: string;
  status: 'RECEIVED' | 'COOKING' | 'READY';
  time: string;
}

export const initialScanfeastOrders: ScanfeastOrder[] = [
  {
    table: '08',
    order: '#142',
    items: '2x Wagyu Burger, 1x Truffle Fries',
    status: 'COOKING',
    time: '04:12',
  },
  {
    table: '14',
    order: '#143',
    items: '1x Artisan Pizza, 2x Iced Tea',
    status: 'RECEIVED',
    time: '01:05',
  },
  {
    table: '03',
    order: '#144',
    items: '1x Chef Special Pasta',
    status: 'RECEIVED',
    time: '00:22',
  },
];

export interface QuantumJudgeScore {
  team: string;
  name: string;
  score: number;
  maxScore: number;
}

export const initialQuantumScores: QuantumJudgeScore[] = [
  { team: 'TEAM A', name: 'Neural Mesh', score: 94, maxScore: 100 },
  { team: 'TEAM B', name: 'Quantum Core', score: 88, maxScore: 100 },
  { team: 'TEAM C', name: 'Cyber Sync', score: 96, maxScore: 100 },
  { team: 'TEAM D', name: 'Aether OS', score: 82, maxScore: 100 },
];

export const quantumPipelineNodes = [
  { id: 'reg', label: 'REG', detail: 'Intake' },
  { id: 'checkin', label: 'CHECK-IN', detail: 'QR Pass' },
  { id: 'judging', label: 'JUDGING', detail: 'Rubric' },
  { id: 'cert', label: 'CERT', detail: 'Canvas' },
  { id: 'email', label: 'EMAIL', detail: 'SMTP Stream' },
];
