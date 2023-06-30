import React from 'react';
import { Pause } from '@/common/assets/PauseIcon';
import { Play } from '@/common/assets/PlayIcon';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import useAudioStore from '@/hooks/useAudioStore';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

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

  const { isPlaying, volume, togglePlay, setVolume } = useAudioStore();

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
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

      {isPlaying && (
        <ReactPlayer
          key={router.route}
          url={liveStreamUrl}
          playing={true}
          volume={volume}
          width='0' // set to 0 for audio-only player
          height='0' // set to 0 for audio-only player
          playsinline
        />
      )}

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
