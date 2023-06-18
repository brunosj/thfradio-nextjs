import { useState, useEffect, useRef, useContext } from 'react';
import { Pause } from '@/common/assets/PauseIcon';
import { Play } from '@/common/assets/PlayIcon';
import { PlayerContext } from '@/context/PlayerContext';

interface Show {
  url: string;
}

interface CalendarEntry {
  start: string;
  end: string;
}

interface AudioPlayerProps {
  shows: Show[];
  calendarEntries: CalendarEntry[];
  iconFill: string;
  iconClassName: string;
}
const AudioPlayer: React.FC<AudioPlayerProps> = ({
  shows,
  calendarEntries,
  iconFill,
  iconClassName,
}) => {
  const liveStreamUrl: string = 'https://thfradio2.out.airtime.pro/thfradio2_b';
  const { playerState, setPlayerState, audio } = useContext(PlayerContext);

  useEffect(() => {
    if (audio) {
      audio.src = liveStreamUrl;

      audio.oncanplaythrough = () => {
        if (playerState.isPlaying) {
          audio.play();
        }
      };

      return () => {
        audio.oncanplaythrough = null; // Cleanup function
      };
    }
  }, [playerState.isPlaying, audio]);

  useEffect(() => {
    if (audio) {
      audio.volume = playerState.volume;
    }
  }, [playerState.volume, audio]);

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

  return (
    <div className='flex items-center'>
      <button onClick={togglePlay}>
        {playerState.isPlaying ? (
          <Pause className={iconClassName} fill={iconFill} />
        ) : (
          <Play className={iconClassName} fill={iconFill} />
        )}
      </button>

      <div className='hidden lg:block mt-1'>
        <input
          type='range'
          min='0'
          max='1'
          step='0.01'
          width='2rem'
          value={playerState.volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
