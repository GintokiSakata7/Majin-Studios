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
    role: 'Co-Founder & CPO',
    specialties: [
      'Product Strategy',
      'AI Applications',
      'Full-Stack',
      'Product Engineering',
    ],
    accent: 'CYAN',
    focus: 'Product direction, AI applications, full-stack engineering, and turning ideas into impactful products.',
    matrixPosition: { x: 0.5, y: 0.55 },
    linkedin: 'https://www.linkedin.com/in/dhanush0254',
  },
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
    focus: 'Technical direction, intelligent systems, architecture, and full-stack AI/ML engineering.',
    matrixPosition: { x: -0.5, y: 0.55 },
    linkedin: 'https://www.linkedin.com/in/rishivardhan-chepuri-282167339',
  },
  {
    id: 'koushik',
    name: 'Koushik',
    role: 'Co-Founder & COO',
    specialties: [
      'Operations',
      'Business Strategy',
      'Client Delivery',
      'Technical Coordination',
    ],
    accent: 'VIOLET',
    focus: 'Operations, client delivery, business development, and technical coordination.',
    matrixPosition: { x: -0.55, y: -0.05 },
    linkedin: 'https://www.linkedin.com/in/thalari-krishnakoushik',
  },
  {
    id: 'rohith',
    name: 'Rohith',
    role: 'Business Development Manager',
    specialties: [
      'Business Development',
      'Sales Strategy',
      'Partnerships',
      'Growth',
    ],
    accent: 'AMBER',
    focus: 'Driving growth through strategic partnerships, business development, and scaling market reach.',
    matrixPosition: { x: 0.55, y: -0.05 },
    linkedin: 'https://www.linkedin.com/in/rohith-reddy-thalasani-1508a8417',
  },
  {
    id: 'saran',
    name: 'Saran',
    role: 'Sales And Marketing Specialist',
    specialties: [
      'Marketing',
      'Sales Funnels',
      'Brand Strategy',
      'Campaigns',
    ],
    accent: 'CYAN',
    focus: 'Crafting marketing strategies, managing sales funnels, and enhancing brand visibility.',
    matrixPosition: { x: -0.35, y: -0.65 },
    linkedin: 'https://www.linkedin.com/in/saran-sai-iyinakota-0a156530a',
  },
  {
    id: 'avinash',
    name: 'Avinash',
    role: 'Full Stack Developer Intern',
    specialties: [
      'Full-Stack',
      'MERN Stack',
      'React.js',
      'Frontend',
    ],
    accent: 'LIME',
    focus: 'Developing full-stack web applications with a focus on modern React and MERN stack architectures.',
    matrixPosition: { x: 0.35, y: -0.65 },
    linkedin: 'https://www.linkedin.com/in/avinash-basani-3930b832a',
  },
];

export default teamData;
