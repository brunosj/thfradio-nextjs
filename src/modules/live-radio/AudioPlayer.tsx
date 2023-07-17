import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import useAudioStore from '@/hooks/useAudioStore';
import { Pause } from '@/common/assets/PauseIcon';
import { Play } from '@/common/assets/PlayIcon';
interface AudioPlayerProps {
  iconFill: string;
  iconClassName: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  iconFill,
  iconClassName,
}) => {
  const router = useRouter();
  const liveStreamUrl: string = 'https://thfradio2.out.airtime.pro/thfradio2_b';

  const audioRef = useRef<HTMLAudioElement>(null);
  const sourceRef = useRef<HTMLSourceElement>(null);

  const { isPlaying, volume, togglePlay, setVolume } = useAudioStore();

  useEffect(() => {
    if (isPlaying) {
      if (!sourceRef?.current?.getAttribute('src')) {
        sourceRef?.current?.setAttribute('src', liveStreamUrl);
      }

      audioRef?.current?.load();
      audioRef?.current?.play();
    } else {
      sourceRef?.current?.setAttribute('src', '');
      audioRef?.current?.pause();
    }
  }, [isPlaying, liveStreamUrl]);

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className='flex items-center'>
      <button onClick={togglePlay} aria-label='Toggle play'>
        {isPlaying ? (
          <Pause className={iconClassName} fill={iconFill} />
        ) : (
          <Play className={iconClassName} fill={iconFill} />
        )}
      </button>

      <audio ref={audioRef}>
        <source ref={sourceRef} type='audio/mpeg' />
      </audio>

      <div className='hidden lg:block -mt-2'>
        <input
          type='range'
          min='0'
          max='1'
          step='0.01'
          style={{ width: '4rem' }}
          value={volume}
          onChange={handleVolumeChange}
          placeholder='Volume'
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
