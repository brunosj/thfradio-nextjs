import { useState, useEffect, useRef } from 'react';
import { Pause } from '@/common/assets/PauseIcon';
import { Play } from '@/common/assets/PlayIcon';

interface Show {
  url: string;
  // Add any other properties that a show may have
}

interface CalendarEntry {
  start: string;
  end: string;
  // Add any other properties that a calendar entry may have
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
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
  const liveStreamUrl: string = 'https://thfradio2.out.airtime.pro/thfradio2_b';
  const audio = useRef<HTMLAudioElement | null>(null);
  const isPausedByUser = useRef<boolean>(false);

  const isLiveShowScheduled = (): boolean => {
    const now = new Date();
    return calendarEntries.some((entry) => {
      const start = new Date(entry.start);
      const end = new Date(entry.end);
      return start <= now && now <= end;
    });
  };

  const getRandomShowUrl = (): string | null => {
    if (shows && shows.length > 0) {
      const randomIndex = Math.floor(Math.random() * shows.length);
      return shows[randomIndex].url;
    } else {
      return null;
    }
  };

  useEffect(() => {
    const url = liveStreamUrl;
    audio.current = new Audio(url);
    audio.current.onplaying = () => {
      setIsPlaying(true);
      isPausedByUser.current = false;
    };
    audio.current.onpause = () => {
      if (isPausedByUser.current) {
        setIsPlaying(false);
      }
    };
  }, [shows, calendarEntries]);

  const togglePlay = () => {
    if (audio.current) {
      if (isPlaying) {
        audio.current.pause();
        isPausedByUser.current = true;
      } else {
        audio.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (audio.current) {
      audio.current.volume = newVolume;
    }
  };

  return (
    <div className='flex items-center'>
      <button onClick={togglePlay}>
        {isPlaying ? (
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
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
