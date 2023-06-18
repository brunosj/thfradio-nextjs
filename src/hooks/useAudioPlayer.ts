import { useState, useCallback } from 'react';

const useAudioPlayer = () => {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    volume: 1,
  });

  const togglePlay = useCallback(() => {
    setPlayerState((prevState) => ({
      ...prevState,
      isPlaying: !prevState.isPlaying,
    }));
  }, []);

  const handleVolumeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(event.target.value);
      setPlayerState((prevState) => ({
        ...prevState,
        volume: newVolume,
      }));
    },
    []
  );

  return { playerState, togglePlay, handleVolumeChange };
};

export default useAudioPlayer;
