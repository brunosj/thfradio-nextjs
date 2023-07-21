import create from 'zustand';

export enum ActivePlayer {
  MIXCLOUD,
  AIRTIME,
}

interface GlobalStore {
  activePlayer: ActivePlayer | undefined;
  activePlayerSet: (activePlayer: ActivePlayer) => void;

  showKey: string | undefined;
  showKeySet: (showKey: string) => void;

  currentShowUrl: string | undefined;
  setCurrentShowUrl: (url: string) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  activePlayer: undefined,
  activePlayerSet: (activePlayer) => set({ activePlayer }),

  showKey: undefined,
  showKeySet: (showKey) =>
    set({
      activePlayer: ActivePlayer.MIXCLOUD,
      showKey,
    }),

  currentShowUrl: undefined,
  setCurrentShowUrl: (url) => set({ currentShowUrl: url }),
}));
