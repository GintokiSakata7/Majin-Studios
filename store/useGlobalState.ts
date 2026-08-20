import { create } from 'zustand';

export type SceneState = 
  | 'CORE'
  | 'CAPABILITIES'
  | 'SYSTEMS'
  | 'AGENTS'
  | 'PRODUCTS'
  | 'TEAM'
  | 'CONTACT';

export type InteractionState = 
  | 'DEFAULT'
  | 'HOVER'
  | 'FOCUS'
  | 'ACTIVE'
  | 'TRANSITIONING';

export type AccentColor = 
  | 'MONOCHROME'
  | 'LIME'
  | 'CYAN'
  | 'AMBER'
  | 'VIOLET';

interface GlobalState {
  // Scene
  currentScene: SceneState;
  setScene: (scene: SceneState) => void;
  
  // Interaction
  interactionState: InteractionState;
  setInteractionState: (state: InteractionState) => void;
  
  // Contextual Styling
  activeAccent: AccentColor;
  setAccent: (accent: AccentColor) => void;
  
  // Progress (0 to 1 across the whole universe)
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
}

export const useGlobalState = create<GlobalState>((set) => ({
  currentScene: 'CORE',
  setScene: (scene) => set({ currentScene: scene }),
  
  interactionState: 'DEFAULT',
  setInteractionState: (state) => set({ interactionState: state }),
  
  activeAccent: 'MONOCHROME',
  setAccent: (accent) => {
    // Keep DOM attribute in sync with Zustand state
    if (typeof document !== 'undefined') {
      const normalizedAccent = String(accent).toLowerCase();
      document.documentElement.setAttribute('data-accent', normalizedAccent);
    }
    set({ activeAccent: accent });
  },
  
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
}));

// Helper to get CSS variable for active accent
export const getAccentVar = (accent: AccentColor): string => {
  switch(accent) {
    case 'LIME': return '#b8ff3d';
    case 'CYAN': return '#00e5ff';
    case 'AMBER': return '#ffb347';
    case 'VIOLET': return '#b46cff';
    case 'MONOCHROME':
    default: return '#f4f6f8';
  }
};
