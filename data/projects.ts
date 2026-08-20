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
    id: 'enterprise-rag',

    number: '02',

    category: 'DATA INFRASTRUCTURE',

    name: 'Semantic Knowledge Engine',

    tagline:
      'High-precision retrieval system for technical documentation.',

    status: 'CONCEPT',
    isConcept: true,

    accent: 'LIME',

    visualType: 'knowledge-graph',

    problem:
      'Standard retrieval can return irrelevant or weakly related technical information when working with dense architectural documentation.',

    solution:
      'A hybrid retrieval architecture combining semantic embeddings, graph relationships, and precise keyword matching.',

    outcome:
      'Conceptual retrieval architecture demonstrating a layered approach to technical knowledge discovery.',

    technologies: [
      'TypeScript',
      'Pinecone',
      'FastAPI',
      'React',
      'AWS',
    ],

    capabilities: [
      {
        label: 'Semantic search',
        description:
          'Retrieve information based on meaning rather than exact wording.',
      },
      {
        label: 'Knowledge relationships',
        description:
          'Represent relationships between technical entities and documentation.',
      },
      {
        label: 'Hybrid retrieval',
        description:
          'Combine semantic and lexical retrieval strategies.',
      },
      {
        label: 'Fast querying',
        description:
          'Designed around responsive technical knowledge exploration.',
      },
    ],

    architecture: [
      {
        id: 'client',
        label: 'Web Client',
        type: 'client',
        position: {
          x: -0.85,
          y: 0,
          z: 0,
        },
        connections: ['gateway'],
        metadata: 'USER QUERY',
      },

      {
        id: 'gateway',
        label: 'API Gateway',
        type: 'api',
        position: {
          x: -0.4,
          y: 0,
          z: 0,
        },
        connections: ['embed', 'vector'],
        metadata: 'QUERY ROUTING',
      },

      {
        id: 'embed',
        label: 'Embedding Engine',
        type: 'ai',
        position: {
          x: 0,
          y: 0.3,
          z: 0,
        },
        connections: ['vector'],
        metadata: 'SEMANTIC REPRESENTATION',
      },

      {
        id: 'vector',
        label: 'Vector DB',
        type: 'database',
        position: {
          x: 0.45,
          y: -0.1,
          z: 0,
        },
        connections: [],
        metadata: 'KNOWLEDGE STORE',
      },
    ],

    assembly: [
      {
        id: 'knowledge-shell',
        label: 'Knowledge Shell',
        order: 1,
        type: 'shell',
        description:
          'Base interface for technical knowledge exploration.',
      },

      {
        id: 'search-panel',
        label: 'Search Panel',
        order: 2,
        type: 'form',
        description:
          'Query interface for technical documentation.',
      },

      {
        id: 'retrieval-panel',
        label: 'Retrieval Panel',
        order: 3,
        type: 'panel',
        description:
          'Ranked retrieval results and semantic relationships.',
      },

      {
        id: 'knowledge-map',
        label: 'Knowledge Map',
        order: 4,
        type: 'map',
        description:
          'Visual representation of relationships between retrieved entities.',
      },
    ],

    metrics: [
      {
        label: 'Retrieval Accuracy',
        value: '99.2%',
        context: 'Concept / simulated metric',
      },
      {
        label: 'Query Latency',
        value: '<200ms',
        context: 'Concept / simulated target',
      },
    ],
  },
];

export default projectsData;
