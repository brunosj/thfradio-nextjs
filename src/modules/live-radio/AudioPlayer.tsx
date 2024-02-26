import { useRef } from 'react';
import usePlayerState from '@/hooks/usePlayerState';
import { Pause } from '@/common/assets/PauseIcon';
import { Play } from '@/common/assets/PlayIcon';

interface AudioPlayerProps {
  iconFill: string;
  iconClassName: string;
  audioSrc: string;
}

export default function LivePlayer({
  iconClassName,
  iconFill,
  audioSrc,
}: AudioPlayerProps) {

  const AUDIO_SRC = audioSrc;

  const player = useRef<HTMLAudioElement>(
    null
  ) as React.MutableRefObject<HTMLAudioElement>;
  const source = useRef<HTMLSourceElement>(
    null
  ) as React.MutableRefObject<HTMLSourceElement>;

  const { isPlaying, play, pause } = usePlayerState({
    audioRef: player,
    sourceRef: source,
    url: AUDIO_SRC,
  });

  return (
    <section className='flex items-center'>
      <button
        className=''
        onClick={isPlaying ? pause : play}
        aria-label={isPlaying ? 'Pause Live Broadcast' : 'Play Live Broadcast'}
      >
        {isPlaying ? (
          <Pause className={iconClassName} fill={iconFill} />
        ) : (
          <Play className={iconClassName} fill={iconFill} />
        )}
      </button>

      <audio hidden id='thfradio-live-player' preload='none' ref={player}>
        <source ref={source} type='audio/mpeg' />
        Your browser does not support the audio element.
      </audio>
    </section>
  );
}
