import React from 'react';
import Image from 'next/image';
import { CloudShowTypes } from '@/types/ResponsesInterface';
import { Play } from '@/common/assets/PlayIcon';
import { format } from 'date-fns';
import { getShowName, getFormattedDateString } from '@/utils/sortShows';

interface ShowCardProps {
  item: CloudShowTypes;
  onPlay: (url: string) => void;
}

const CloudShowChild = ({ item, onPlay }: ShowCardProps) => {
  const name = getShowName(item);
  const formattedDate = getFormattedDateString(item);

  return (
    <button
      className='flex flex-row w-full md:w-[48%] lg:w-[29%] xl:w-[22%]  border border-blue-800 bg-white font-mono duration-200 lg:flex-col rounded-xl p-4 group items-center '
      onClick={() => onPlay(item.url)}
    >
      {/* Image */}
      <div className='group relative flex justify-around items-center'>
        <div className='w-24 lg:w-40 xl:w-56 group-hover:opacity-20 duration-300'>
          <Image
            src={item.pictures.extra_large}
            height={600}
            width={600}
            alt=''
          />
        </div>
        <div className='absolute inset-0 m-auto flex w-1/3 items-center justify-center opacity-0 duration-300 group-hover:opacity-100'>
          <Play className='' fill='#1200ff' />
        </div>
      </div>

      {/* Show Details */}
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
              <li key={i} className='rounded-xl border-blue-800 border px-2 '>
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </button>
  );
};

export default CloudShowChild;
