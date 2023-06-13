import React, { useState } from 'react';
import Image from 'next/image';
import { CloudShowTypes } from '@/types/ResponsesInterface';
import { format, parseISO } from 'date-fns';
import { Play } from '@/common/assets/PlayIcon';

interface ShowCardProps {
  items: CloudShowTypes[];
  onPlay: (url: string) => void;
}

const ShowCards = ({ items, onPlay }: ShowCardProps) => {
  const [displayCount, setDisplayCount] = useState(20);

  const handleLoadMore = () => {
    setDisplayCount(displayCount + 20);
  };
  return (
    <div className='justify-between gap-12 lg:grid lg:grid-cols-3 xl:grid-cols-4 space-y-6 lg:space-y-0'>
      {items.slice(0, displayCount).map((item, i) => {
        const showNameSplitted = item.name.split('//');
        const name = showNameSplitted[0].trim();
        const date =
          showNameSplitted.length > 1 ? showNameSplitted[1].trim() : null;

        let formattedDate = null;

        try {
          if (date) {
            const dateParts = date.split('.');
            let day, month, year;
            if (dateParts[2] && dateParts[2].length === 4) {
              // Format: dd.mm.yyyy
              day = dateParts[0].trim();
              month = dateParts[1].trim();
              year = dateParts[2].trim();
            } else if (dateParts[2] && dateParts[2].length === 2) {
              // Format: dd.mm.yy
              day = dateParts[0].trim();
              month = dateParts[1].trim();
              year =
                new Date().getFullYear().toString().slice(0, 2) +
                dateParts[2].trim();
            } else {
              // Format: dd.mm. (year not provided)
              const currentYear = new Date().getFullYear();
              day = dateParts[0].trim();
              month = dateParts[1].trim();
              year = currentYear.toString();
            }

            if (day && month && year) {
              formattedDate = `${day}.${month}.${year}`;
            }
          }
        } catch (error) {
          console.error('Date parsing failed:', error);
        }

        return (
          <button
            className='flex flex-row w-full border border-blue-800 bg-white font-mono duration-200 lg:flex-col rounded-xl p-4 group items-center'
            key={i}
            onClick={() => onPlay(item.url)}
          >
            <div className='group relative flex h-full justify-around '>
              <div className='w-24 lg:w-64 group-hover:opacity-20 duration-300'>
                <Image
                  src={item.pictures.extra_large}
                  height={600}
                  width={600}
                  // layout='responsive'
                  alt=''
                />
              </div>
              <div className='absolute inset-0 m-auto flex w-1/3 items-center justify-center opacity-0 duration-300 group-hover:opacity-100'>
                <Play className='' fill='#1200ff' />
              </div>
            </div>

            <div className='my-6 flex h-full w-2/3 flex-grow  flex-col items-stretch justify-around lg:mt-8 lg:mb-6 lg:w-full '>
              <h4 className='group-hover:text-blue-500 duration-300 mb-6 px-4 font-bold  text-left'>
                {name}
              </h4>
              <div className='px-4 text-left font-light opacity-70 lg:px-8 lg:text-center'>
                {formattedDate}
              </div>
            </div>
          </button>
        );
      })}
      {displayCount < items.length && (
        <div className='col-span-4 text-white m-auto'>
          <button onClick={handleLoadMore}>Load More</button>
        </div>
      )}
    </div>
  );
};

export default ShowCards;
