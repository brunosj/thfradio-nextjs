// PlayerContext.tsx

import React, { createContext, useState, ReactNode } from 'react';

interface PlayerState {
  isPlaying: boolean;
  volume: number;
  position: number;
}

interface PlayerContextProps {
  playerState: PlayerState;
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>;
}

const initialPlayerState: PlayerState = {
  isPlaying: false,
  volume: 1,
  position: 0,
};


export const PlayerContext = createContext<PlayerContextProps>({
  playerState: initialPlayerState,
  setPlayerState: () => {},
});

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [playerState, setPlayerState] =
    useState<PlayerState>(initialPlayerState);

  return (
    <PlayerContext.Provider value={{ playerState, setPlayerState }}>
      {children}
    </PlayerContext.Provider>
  );
};
