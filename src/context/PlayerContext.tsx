import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface PlayerState {
  isPlaying: boolean;
  volume: number;
}

interface PlayerContextProps {
  playerState: PlayerState;
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>;
  audio: HTMLAudioElement | null;
}

const initialPlayerState: PlayerState = {
  isPlaying: false,
  volume: 1, // Add the initial volume here
};

export const PlayerContext = createContext<PlayerContextProps>({
  playerState: initialPlayerState,
  setPlayerState: () => {},
  audio: null,
});

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [playerState, setPlayerState] =
    useState<PlayerState>(initialPlayerState);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audioObj = new Audio();
      audioObj.volume = playerState.volume;
      setAudio(audioObj);
    }
    return () => {
      if (audio) {
        audio.pause();
        setAudio(null);
      }
    };
  }, [audio, playerState.volume]);

  return (
    <PlayerContext.Provider value={{ playerState, setPlayerState, audio }}>
      {children}
    </PlayerContext.Provider>
  );
};
