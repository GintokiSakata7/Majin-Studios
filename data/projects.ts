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
    id: 'agentic-orchestrator',
    number: '01',

    category: 'AI SYSTEM',

    name: 'Agentic Workflow Orchestrator',

    tagline:
      'Autonomous multi-agent system for complex software execution.',

    status: 'CONCEPT',
    isConcept: true,

    accent: 'CYAN',

    visualType: 'agent-network',

    problem:
      'Traditional automation pipelines lack the reasoning capabilities required for non-deterministic software tasks, leading to brittle integrations.',

    solution:
      'A specialized orchestrator that delegates tasks to specialized AI agents, evaluates intermediate outputs, and coordinates multi-step execution.',

    outcome:
      'Conceptual architecture demonstrating planner-driven agent orchestration and tool-based execution.',

    technologies: [
      'Next.js',
      'Python',
      'LangChain',
      'OpenAI',
      'PostgreSQL',
    ],

    capabilities: [
      {
        label: 'Planning',
        description:
          'Break complex objectives into executable steps.',
      },
      {
        label: 'Agent orchestration',
        description:
          'Coordinate specialized agents across a shared workflow.',
      },
      {
        label: 'Tool execution',
        description:
          'Allow agents to interact with external capabilities.',
      },
      {
        label: 'Evaluation',
        description:
          'Assess intermediate outputs before continuing execution.',
      },
    ],

    architecture: [
      {
        id: 'ui',
        label: 'Dashboard',
        type: 'frontend',
        position: {
          x: -0.8,
          y: 0.4,
          z: 0,
        },
        connections: ['api'],
        metadata: 'USER INTERFACE',
      },

      {
        id: 'api',
        label: 'REST API',
        type: 'api',
        position: {
          x: -0.4,
          y: 0.15,
          z: 0,
        },
        connections: ['orch'],
        metadata: 'REQUEST LAYER',
      },

      {
        id: 'orch',
        label: 'Orchestrator',
        type: 'backend',
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        connections: ['agent-planner', 'agent-coder'],
        metadata: 'COORDINATION CORE',
      },

      {
        id: 'agent-planner',
        label: 'Planner Agent',
        type: 'agent',
        position: {
          x: 0.45,
          y: 0.35,
          z: 0,
        },
        connections: ['agent-coder'],
        metadata: 'TASK PLANNING',
      },

      {
        id: 'agent-coder',
        label: 'Coder Agent',
        type: 'agent',
        position: {
          x: 0.6,
          y: -0.25,
          z: 0,
        },
        connections: [],
        metadata: 'EXECUTION',
      },
    ],

    assembly: [
      {
        id: 'orchestrator-shell',
        label: 'Orchestrator Shell',
        order: 1,
        type: 'shell',
        description:
          'Base product frame and visual environment.',
      },

      {
        id: 'workflow-panel',
        label: 'Workflow Panel',
        order: 2,
        type: 'workflow',
        description:
          'Visual representation of the active agent workflow.',
      },

      {
        id: 'agent-dashboard',
        label: 'Agent Dashboard',
        order: 3,
        type: 'dashboard',
        description:
          'Agent states, execution steps and system activity.',
      },

      {
        id: 'execution-panel',
        label: 'Execution Panel',
        order: 4,
        type: 'terminal',
        description:
          'Execution events and tool activity.',
      },
    ],

    metrics: [
      {
        label: 'Task Success',
        value: '94%',
        context: 'Concept / simulated metric',
      },
      {
        label: 'Execution Speed',
        value: '3×',
        context: 'Concept / simulated comparison',
      },
    ],
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
