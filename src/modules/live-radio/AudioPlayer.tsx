import React, { useContext } from 'react';
import { Pause } from '@/common/assets/PauseIcon';
import { Play } from '@/common/assets/PlayIcon';
import { PlayerContext } from '@/context/PlayerContext';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import useAudioPlayer from '@/hooks/useAudioPlayer';

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
  const { playerState, togglePlay, handleVolumeChange } = useAudioPlayer();

  return (
    <div className='flex items-center'>
      <button onClick={togglePlay}>
        {playerState.isPlaying ? (
          <Pause className={iconClassName} fill={iconFill} />
        ) : (
          <Play className={iconClassName} fill={iconFill} />
        )}
      </button>

      <ReactPlayer
        key={router.route}
        url={liveStreamUrl}
        playing={playerState.isPlaying}
        volume={playerState.volume}
        width='0' // set to 0 for audio-only player
        height='0' // set to 0 for audio-only player
        playsinline
      />

      <div className='hidden lg:block -mt-2'>
        <input
          type='range'
          min='0'
          max='1'
          step='0.01'
          style={{ width: '4rem' }}
          value={playerState.volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
