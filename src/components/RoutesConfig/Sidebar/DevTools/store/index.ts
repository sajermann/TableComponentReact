import { create } from 'zustand';

interface DevToolsState {
  renderCount: number;
  incrementRenderCount: () => void;
  resetRenderCount: () => void;
}

export const useDevToolsStore = create<DevToolsState>((set) => ({
  renderCount: 1,
  incrementRenderCount: () => set((state) => ({ renderCount: state.renderCount + 1 })),
  resetRenderCount: () => set({ renderCount: 1 }),
}));
