import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { CloudShowTypes } from '@/types/ResponsesInterface';
import { format, parseISO } from 'date-fns';
import { Play } from '@/common/assets/PlayIcon';
import Button from '@/common/ui/UIButton';

interface ShowCardProps {
  items: CloudShowTypes[];
  onPlay: (url: string) => void;
}

const CloudShowsCards = ({ items, onPlay }: ShowCardProps) => {
  const [displayCount, setDisplayCount] = useState(20);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const topRef = useRef<HTMLDivElement | null>(null);
  const handleLoadMore = () => {
    setDisplayCount(displayCount + 20);
  };

  const toggleSidePanel = () => {
    setShowSidePanel(!showSidePanel);
    setSelectedTag(null);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag);
    setDisplayCount(20);
  };

  const getFilteredItems = () => {
    let filteredItems = items;

    if (selectedTag) {
      filteredItems = filteredItems.filter((item) =>
        item.tags.some((tag) => tag.name === selectedTag)
      );
    }

    return filteredItems.slice(0, displayCount);
  };

  const countTagOccurrences = () => {
    const tagCount: { [tag: string]: number } = {};

    items.forEach((item) => {
      item.tags.forEach((tag) => {
        if (tagCount[tag.name]) {
          tagCount[tag.name]++;
        } else {
          tagCount[tag.name] = 1;
        }
      });
    });

    return tagCount;
  };

  const sortedTags = () => {
    const tagCount = countTagOccurrences();

    const sortedTags = Object.keys(tagCount).sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    );

    return sortedTags.filter((tag) => tagCount[tag] > 1);
  };

  useEffect(() => {
    if (topRef.current) {
      const elementPositionY = topRef.current.getBoundingClientRect().top;
      window.scrollTo({
        top: elementPositionY + window.scrollY - 160,
        behavior: 'smooth',
      });
    }
  }, [selectedTag]);

  return (
    <div className='relative' ref={topRef}>
      <div className='hidden lg:flex justify-between mb-4 pb-12 -mt-8'>
        <div className=' m-auto'>
          <button
            className={`flex font-mono rounded-xl text-sm shadow-sm border-blue-800 px-4 py-2  ${
              showSidePanel ? 'bg-orange-500 text-white' : 'bg-white'
            } duration-300 `}
            onClick={toggleSidePanel}
          >
            Filter by Tag
          </button>
        </div>
      </div>

      <div className='flex  items-start '>
        <div
          className={`w-${
            showSidePanel ? '4/5' : 'full'
          } flex flex-wrap lg:gap-12 gap-6 justify-start`}
        >
          {getFilteredItems().map((item, i) => {
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
                className='flex flex-row w-full md:w-[48%] lg:w-[29%] xl:w-[22%]  border border-blue-800 bg-white font-mono duration-200 lg:flex-col rounded-xl p-4 group items-center '
                key={i}
                onClick={() => onPlay(item.url)}
              >
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

                <div className='mt-3 lg:mt-6 flex h-full w-2/3 flex-grow  flex-col  lg:w-full px-6 text-left lg:text-center space-y-3 lg:space-y-6 mb-3 justify-center lg:justify-between'>
                  <div className='flex space-y-3 flex-col'>
                    <span className='font-light opacity-70 text-sm '>
                      {formattedDate}
                    </span>
                    <h4 className='group-hover:text-blue-500 duration-300 lg:mb-6 font-bold '>
                      {name}
                    </h4>
                  </div>

                  {item.tags && (
                    <ul className='flex mt-auto flex-wrap text-xs gap-2 justify-start lg:justify-center'>
                      {item.tags.map((item, i) => (
                        <li
                          key={i}
                          className='rounded-xl border-blue-800 border px-2 '
                        >
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        {showSidePanel && (
          <div className='sticky top-32 w-1/5 rounded-xl bg-white'>
            <div className='bg-orange-500 py-2 rounded-t-xl text-white'>
              <h3 className='font-semibold mb-2 font-mono text-center'>Tags</h3>
            </div>
            <div className='pl-4 py-4 max-h-screen overflow-auto'>
              <div className='flex flex-wrap space-x-2'>
                {sortedTags().map((tag, index) => (
                  <button
                    key={index}
                    className={`border-blue-800 border text-sm font-mono rounded-xl px-2 py-1 mt-2 ${
                      tag === selectedTag ? 'bg-blue-500 text-white' : ''
                    }`}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {displayCount < items.length && (
        <div className='pt-12 w-full flex justify-center'>
          <button
            className='flex font-mono rounded-xl text-sm shadow-sm border-blue-800 px-4 py-2 bg-white  duration-300 hover:bg-blue-100 '
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CloudShowsCards;
