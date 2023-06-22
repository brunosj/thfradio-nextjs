import React from 'react';
import Image from 'next/image';
import { CloudShowTypes } from '@/types/ResponsesInterface';
import { Play } from '@/common/assets/PlayIcon';
import { getShowName, getFormattedDateString } from '@/utils/showUtils';
import useAudioStore from '@/hooks/useAudioStore';
import BarsSpinner from '@/common/ui/BarsSpinner';
import { useState, useEffect } from 'react';

interface ShowCardProps {
  item: CloudShowTypes;
}

const CloudShowChild = ({ item }: ShowCardProps) => {
  const {
    isPlaying,
    url,
    togglePlay,
    setUrl,
    setSource,
    isMixcloudPlaying,
    setMixcloudPlay,
  } = useAudioStore();

  // Fixes inconsistencies between show title and images during loading after selecting tags
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
  }, [item]);

  // Show info rendering
  const name = getShowName(item);
  const formattedDate = getFormattedDateString(item);

  // Store state functionality
  let isCurrentShowPlaying = url === item.url;
  const onPlay = (selectedUrl: string) => {
    if (isMixcloudPlaying && selectedUrl === url) {
      // If the Mixcloud show is already playing, pause it
      // need to fix this functionality and display a PAUSE sign when a show is playing
      // setMixcloudPlay(false);
      // isCurrentShowPlaying = false;
    } else {
      if (isPlaying) {
        togglePlay();
      }
      if (selectedUrl !== url) {
        setUrl(selectedUrl);
        setSource('archive');
      }
      if (!isMixcloudPlaying) {
        setMixcloudPlay(true);
      }
    }
  };

  return (
    <button
      className='flex flex-row w-full md:w-[48%] lg:w-[29%] xl:w-[22%]  border border-darkBlue bg-white font-mono duration-200 lg:flex-col rounded-xl p-4 group items-center '
      onClick={() => onPlay(item.url)}
    >
      {/* Image */}
      <div className='group relative flex justify-around items-center'>
        <div
          className={`w-24 lg:w-40 xl:w-56 ${
            isCurrentShowPlaying
              ? 'opacity-50'
              : 'group-hover:opacity-50 duration-300'
          }`}
        >
          <Image
            src={item.pictures.extra_large}
            height={600}
            width={600}
            alt=''
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <div
          className={`absolute inset-0 m-auto flex w-1/3 items-center justify-center duration-300 opacity-0 group-hover:opacity-100 ${
            isCurrentShowPlaying ? 'opacity-100' : ' '
          }`}
        >
          {isCurrentShowPlaying ? (
            <BarsSpinner color='#1200ff' />
          ) : (
            <Play className='' fill='#1200ff' />
          )}
        </div>
      </div>

      {/* {imageLoaded && ( */}
      <div className='mt-3 lg:mt-6 flex h-full w-2/3 flex-grow  flex-col  lg:w-full px-6 text-left lg:text-center space-y-3 lg:space-y-6 mb-3 justify-center lg:justify-between'>
        <div className='flex space-y-3 flex-col'>
          <span className='font-light opacity-70 text-sm'>{formattedDate}</span>
          <h4 className='group-hover:text-blue-500 duration-300 lg:mb-6 font-bold '>
            {name}
          </h4>
        </div>

        {/* Tags */}
        {item.tags && (
          <ul className='flex mt-auto flex-wrap text-xs gap-2 justify-start lg:justify-center'>
            {item.tags.map((item, i) => (
              <li key={i} className='rounded-xl border-darkBlue border px-2 '>
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* )} */}
    </button>
  );
};

export default CloudShowChild;
