export type TeamAccent =
  | 'MONOCHROME'
  | 'LIME'
  | 'CYAN'
  | 'AMBER'
  | 'VIOLET';

export interface TeamMember {
  id: string;

  name: string;

  role: string;

  title?: string;

  specialties: string[];

  accent: TeamAccent;

  /*
   * Short descriptor used inside the cinematic team matrix.
   */
  focus?: string;

  /*
   * Optional visual position for the Team Matrix.
   */
  matrixPosition?: {
    x: number;
    y: number;
  };

  linkedin?: string;


  photo?: string;
}

export const teamData: TeamMember[] = [
  {
    id: 'rishi',

    name: 'Rishi',

    role: 'Co-Founder & CTO',

    specialties: [
      'AI/ML',
      'LLM Systems',
      'AI Agents',
      'Full-Stack',
      'Architecture',
    ],

    accent: 'LIME',

    focus:
      'Technical direction, intelligent systems, architecture, and full-stack engineering.',

    matrixPosition: {
      x: -0.5,
      y: 0.55,
    },

    linkedin: 'https://linkedin.com',
  },

  {
    id: 'cofounder-cpo',

    name: 'Friend',

    role: 'Co-Founder & CPO',

    specialties: [
      'Product Strategy',
      'AI Applications',
      'Full-Stack',
      'Product Engineering',
    ],

    accent: 'CYAN',

    focus:
      'Product direction, AI applications, full-stack engineering, and turning ideas into products.',
    
    matrixPosition: {
      x: 0.5,
      y: 0.55,
    },
  },

  {
    id: 'coo',

    name: 'Member 3',

    role: 'COO',

    specialties: [
      'Operations',
      'Business',
      'Sales',
      'Client Delivery',
      'Technical Coordination',
    ],

    accent: 'AMBER',

    focus:
      'Operations, client delivery, business development, and technical coordination.',

    matrixPosition: {
      x: -0.55,
      y: -0.05,
    },
  },

  {
    id: 'full-stack-engineer',

    name: 'Member 4',

    role: 'Full-Stack Software Engineer',

    specialties: [
      'Frontend',
      'UI/UX',
      'Animations',
      'Responsive Design',
      'Backend',
      'Product Engineering',
    ],

    accent: 'VIOLET',

    focus:
      'Full-stack engineering with a strong focus on frontend experience, UI/UX, animation, and responsive products.',

    matrixPosition: {
      x: 0.55,
      y: -0.05,
    },
  },

  {
    id: 'member-5',

    name: 'Member 5 TBD',

    role: 'Role TBD',

    specialties: [
      'Specialty TBD',
    ],

    accent: 'MONOCHROME',

    focus:
      'Team profile to be completed with the member’s confirmed responsibilities.',

    matrixPosition: {
      x: -0.35,
      y: -0.65,
    },
  },

  {
    id: 'member-6',

    name: 'Member 6 TBD',

    role: 'Role TBD',

    specialties: [
      'Specialty TBD',
    ],

    accent: 'MONOCHROME',

    focus:
      'Team profile to be completed with the member’s confirmed responsibilities.',

    matrixPosition: {
      x: 0.35,
      y: -0.65,
    },
  },
];

export default teamData;
