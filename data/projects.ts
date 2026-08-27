export type ProjectStatus =
  | 'CONCEPT'
  | 'PROTOTYPE'
  | 'INTERNAL BUILD'
  | 'PRODUCTION';

export type ProjectAccent =
  | 'MONOCHROME'
  | 'LIME'
  | 'CYAN'
  | 'AMBER'
  | 'VIOLET';

export type ArchitectureNodeType =
  | 'client'
  | 'frontend'
  | 'api'
  | 'backend'
  | 'database'
  | 'ai'
  | 'agent'
  | 'external'
  | 'service'
  | 'deployment';

export interface ArchitectureNode {
  id: string;
  label: string;
  type: ArchitectureNodeType;

  /**
   * Optional visual positioning for diagrams / 3D scenes.
   * Values are normalized and should generally stay
   * between -1 and 1.
   */
  position?: {
    x: number;
    y: number;
    z?: number;
  };

  /**
   * IDs of connected architecture nodes.
   */
  connections?: string[];

  /**
   * Optional metadata displayed by the visual system.
   */
  metadata?: string;
}

export interface ProductAssemblyLayer {
  id: string;
  label: string;

  /**
   * Controls the order in which the UI/system layer is
   * materialized.
   */
  order: number;

  /**
   * Used by the future product assembly renderer.
   */
  type:
    | 'shell'
    | 'navigation'
    | 'dashboard'
    | 'panel'
    | 'chart'
    | 'table'
    | 'chat'
    | 'workflow'
    | 'terminal'
    | 'map'
    | 'form'
    | 'custom';

  description?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;

  /**
   * Optional qualifier so concept/demo metrics do not
   * look like independently verified production results.
   */
  context?: string;
}

export interface ProjectCapability {
  label: string;
  description?: string;
}

export interface Project {
  id: string;

  number: string;

  category: string;

  name: string;

  tagline: string;

  status: ProjectStatus;

  isConcept: boolean;

  accent: ProjectAccent;

  /**
   * Primary visual treatment for the cinematic case-study
   * section.
   */
  visualType:
    | 'agent-network'
    | 'knowledge-graph'
    | 'dashboard-system'
    | 'architecture'
    | 'workflow'
    | 'custom';

  problem: string;

  solution: string;

  /**
   * Short result / positioning statement.
   * Keep this factual; don't invent business outcomes.
   */
  outcome?: string;

  technologies: string[];

  capabilities?: ProjectCapability[];

  architecture?: ArchitectureNode[];

  assembly?: ProductAssemblyLayer[];

  metrics?: ProjectMetric[];

  /**
   * Optional external links.
   */
  links?: {
    live?: string;
    caseStudy?: string;
  };
}

export const projectsData: Project[] = [
  {
    id: 'scanfeast-platform',
    number: '01',

    category: 'Web SaaS / Business Application',

    name: 'Scanfeast Platform',

    tagline:
      'A Smart Contactless Ordering System bridging the gap between diners, chefs, and management through real-time web technology.',

    status: 'PRODUCTION',
    isConcept: false,

    accent: 'CYAN',

    visualType: 'architecture',

    problem:
      'Traditional dine-in restaurants often suffer from a fragmented communication loop. Customers rely on physical menus and waitstaff, while kitchens rely on easily lost printed tickets. Managers lack real-time visibility into kitchen bottlenecks and revenue during peak hours.',

    solution:
      'We transformed the traditional dining flow into a fully digitized, real-time ecosystem where every action is broadcasted across the network instantly, keeping diners, chefs, and managers perfectly in sync.',

    outcome:
      '100% digital workflow with tested order placement flow < 60s, using robust WebSocket + HTTP polling fallback.',

    technologies: [
      'React',
      'Node.js',
      'Socket.IO',
      'MongoDB',
      'Express',
    ],

    capabilities: [
      {
        label: 'Diner Experience',
        description:
          'QR-code scanning for a dynamic mobile menu. Place orders, chat with managers, and track food prep time live.',
      },
      {
        label: 'Kitchen Display System (KDS)',
        description:
          'Real-time, FIFO-sorted queue. Accept orders, add delays, and monitor countdowns with auto-calculating ETAs.',
      },
      {
        label: 'Manager Dashboard',
        description:
          'Full menu control, live revenue tracking, help desk management, and a global "Rush Hour" buffer toggle.',
      },
      {
        label: 'Network Resilience & Sync',
        description:
          'Client-server time sync for accurate timers, backed by WebSocket delivery and silent HTTP polling fallbacks.',
      },
    ],

    architecture: [
      {
        id: 'customer-browser',
        label: 'Customer Browser',
        type: 'client',
        position: {
          x: -0.6,
          y: 0.4,
          z: 0,
        },
        connections: ['express-api', 'socket-server'],
        metadata: 'DINER EXPERIENCE',
      },

      {
        id: 'kitchen-kds',
        label: 'Kitchen Tablet/KDS',
        type: 'client',
        position: {
          x: 0,
          y: 0.4,
          z: 0,
        },
        connections: ['express-api', 'socket-server'],
        metadata: 'SMART TIMERS',
      },

      {
        id: 'manager-dashboard',
        label: 'Manager Dashboard',
        type: 'client',
        position: {
          x: 0.6,
          y: 0.4,
          z: 0,
        },
        connections: ['express-api', 'socket-server'],
        metadata: 'LIVE CONTROL',
      },

      {
        id: 'express-api',
        label: 'Express REST API',
        type: 'api',
        position: {
          x: -0.3,
          y: -0.1,
          z: 0,
        },
        connections: ['mongodb'],
        metadata: 'BACKEND',
      },

      {
        id: 'socket-server',
        label: 'Socket.IO Server',
        type: 'api',
        position: {
          x: 0.3,
          y: -0.1,
          z: 0,
        },
        connections: ['mongodb'],
        metadata: 'REAL-TIME LAYER',
      },

      {
        id: 'mongodb',
        label: 'MongoDB Atlas',
        type: 'database',
        position: {
          x: 0,
          y: -0.5,
          z: 0,
        },
        connections: [],
        metadata: 'PERSISTENCE',
      },
    ],

    assembly: [
      {
        id: 'diner-app',
        label: 'Diner Mobile Web',
        order: 1,
        type: 'dashboard',
        description:
          'No-download mobile ordering interface via QR scan.',
      },

      {
        id: 'kds-panel',
        label: 'KDS Dashboard',
        order: 2,
        type: 'panel',
        description:
          'Real-time kitchen order queue with automated ETAs.',
      },

      {
        id: 'manager-stats',
        label: 'Manager Stats',
        order: 3,
        type: 'chart',
        description:
          'Live revenue tracking and emergency SOS alerts.',
      },

      {
        id: 'realtime-sync',
        label: 'Real-time Sync',
        order: 4,
        type: 'workflow',
        description:
          'Instant WebSocket broadcasting with fallback polling.',
      },
    ],

    metrics: [
      {
        label: 'Tested Placement Flow',
        value: '< 60s',
        context: 'From scan to kitchen receipt',
      },
      {
        label: 'Digital Workflow',
        value: '100%',
        context: 'Eliminated printed tickets',
      },
    ],
    links: {
      caseStudy: '/scanfeast'
    }
  },

  {
    id: 'quantum-arena',

    number: '02',

    category: 'SYSTEM / OPERATIONAL',

    name: 'Quantum Arena',

    tagline:
      'End-to-end digital infrastructure behind a 36-hour event.',

    status: 'PRODUCTION',
    isConcept: false,

    accent: 'LIME',

    visualType: 'dashboard-system',

    problem:
      'Managing registration, verification, check-in, and judging for large-scale events often involves fragmented systems and manual work.',

    solution:
      'An end-to-end operations platform combining participant workflows, event-day controls, judge tooling, and post-event automation.',

    outcome:
      'Engineered the digital infrastructure behind a 36-hour event handling 1,500+ participants.',

    technologies: [
      'React 19',
      'Vite',
      'Node.js',
      'Express',
      'MongoDB',
    ],

    capabilities: [
      {
        label: 'Participant Module',
        description:
          'Registration, team information, live status and published scorecards.',
      },
      {
        label: 'Verification & Check-in',
        description:
          'Payment and ID uploads, secure review, QR scanning, and attendance operations.',
      },
      {
        label: 'Judging & Scoring',
        description:
          'Dedicated judge portals, master evaluation sheet, and top-ranking reports.',
      },
      {
        label: 'Automation',
        description:
          'Image-based certificates and controlled transactional email distribution.',
      },
    ],

    architecture: [
      {
        id: 'client',
        label: 'Participant UI',
        type: 'client',
        position: {
          x: -0.85,
          y: 0,
          z: 0,
        },
        connections: ['gateway'],
        metadata: 'REACT / VITE',
      },

      {
        id: 'admin',
        label: 'Admin + Judge UI',
        type: 'frontend',
        position: {
          x: -0.4,
          y: 0.3,
          z: 0,
        },
        connections: ['gateway'],
        metadata: 'SECURE PORTALS',
      },

      {
        id: 'gateway',
        label: 'Node + Express API',
        type: 'api',
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        connections: ['db', 'services'],
        metadata: 'EVENT LOGIC',
      },

      {
        id: 'db',
        label: 'MongoDB',
        type: 'database',
        position: {
          x: 0.45,
          y: -0.2,
          z: 0,
        },
        connections: [],
        metadata: 'STATE & SCORES',
      },
      {
        id: 'services',
        label: 'Cloudinary + Email',
        type: 'external',
        position: {
          x: 0.45,
          y: 0.2,
          z: 0,
        },
        connections: [],
        metadata: 'UPLOADS & NOTIFS',
      },
    ],

    assembly: [
      {
        id: 'qa-shell',
        label: 'Platform Shell',
        order: 1,
        type: 'shell',
        description:
          'Base interface for event operations.',
      },

      {
        id: 'registration-panel',
        label: 'Registration & Verification',
        order: 2,
        type: 'form',
        description:
          'Participant intake and approval workflows.',
      },

      {
        id: 'judging-panel',
        label: 'Judge Portal',
        order: 3,
        type: 'panel',
        description:
          'Structured team evaluation and scoring.',
      },

      {
        id: 'automation-engine',
        label: 'Certificate Engine',
        order: 4,
        type: 'workflow',
        description:
          'Automated generation and distribution of certificates.',
      },
    ],

    metrics: [
      {
        label: 'Participants',
        value: '1500+',
        context: 'Event scale',
      },
      {
        label: 'Event Duration',
        value: '36H',
        context: 'Continuous operations',
      },
    ],
    links: {
      caseStudy: '/quantumarena'
    }
  },
];

export default projectsData;
