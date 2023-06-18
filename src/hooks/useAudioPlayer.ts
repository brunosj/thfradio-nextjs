import { useState, useCallback } from 'react';

interface PlayerState {
  isPlaying: boolean;
  volume: number;
}

const useAudioPlayer = () => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    volume: 1,
  });

  const togglePlay = () => {
    setPlayerState((prevState) => ({
      ...prevState,
      isPlaying: !prevState.isPlaying,
    }));
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setPlayerState((prevState) => ({
      ...prevState,
      volume: newVolume,
    }));
  };

  return { playerState, togglePlay, handleVolumeChange };
};

export default useAudioPlayer;
