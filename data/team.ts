export type TeamAccent =
  | 'MONOCHROME'
  | 'LIME'
  | 'CYAN'
  | 'AMBER'
  | 'VIOLET';

export interface TeamMember {
  id: string;
  name: string;
  fullName: string;
  role: string;
  title?: string;
  specialties: string[];
  accent: TeamAccent;
  focus?: string;
  matrixPosition?: {
    x: number;
    y: number;
  };
  linkedin?: string;
  github?: string;
  photo?: string;
}

export const teamData: TeamMember[] = [
  {
    id: 'dhanush',
    name: 'Dhanush',
    fullName: 'Dhanush A',
    role: 'Founder',
    specialties: [
      'Product Strategy',
      'AI Applications',
      'Full-Stack',
      'Product Engineering',
    ],
    accent: 'CYAN',
    focus: 'Product direction, AI applications, full-stack engineering, and turning ideas into impactful products.',
    matrixPosition: { x: 0, y: 0 },
    linkedin: 'https://www.linkedin.com/in/dhanush0254',
  },
];

export default teamData;
