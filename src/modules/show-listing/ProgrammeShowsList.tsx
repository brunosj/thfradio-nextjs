import { useState, useEffect } from 'react';
import React from 'react';
import { ShowTypes } from '@/types/ResponsesInterface';
import useShowListings from '@/hooks/useShowListings';
import BarsSpinner from '@/common/ui/BarsSpinner';
import ShowListingChild from './ProgrammeShowsChild';

interface ProgrammeShowsListProps {
  items: ShowTypes[];
  isActive: boolean;
  locale: string;
}

const ProgrammeShowsList: React.FC<ProgrammeShowsListProps> = ({
  items,
  isActive,
  locale,
}) => {
  const thfShows = items.filter((item) =>
    item.attributes.title.toUpperCase().startsWith('THF')
  );

  const [refs, activeLetter, scrollToShow] = useShowListings(items);

  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const lettersWithShows: string[] = items.map((item) =>
    item.attributes.title[0].toUpperCase()
  );

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (items && items.length > 0) {
      setIsLoading(false);
    }
  }, [items]);

  return (
    <div className='relative'>
      {isActive && (
        <div className='bg-blue-500 lg:sticky top-[6.5rem] z-50 opacity-90 w-full'>
          <div className=' layout space-x-2 text-white py-2'>
            {alphabet.map((letter) =>
              lettersWithShows.includes(letter) ? (
                <button
                  key={letter}
                  onClick={() => scrollToShow(letter)}
                  aria-label={letter}
                >
                  {letter}
                </button>
              ) : (
                <button
                  key={letter}
                  disabled
                  className='disabled:cursor-not-allowed text-darkBlue'
                >
                  {letter}
                </button>
              )
            )}
          </div>
        </div>
      )}

      {!isActive && <div className='bg-blue-500 opacity-90 py-3' />}
      <div className='layout py-12 bg-orange-500 grid grid-cols-1 gap-3 lg:gap-6'>
        {isLoading ? (
          <div className='m-auto text-center'>
            <BarsSpinner color='#1200ff' />
          </div>
        ) : (
          <>
            {thfShows
              .sort((a, b) =>
                a.attributes.title.localeCompare(b.attributes.title)
              )
              .map((item) => (
                <ShowListingChild key={item.id} item={item} />
              ))}

            {items
              .filter(
                (item) => !item.attributes.title.toUpperCase().startsWith('THF')
              )
              .sort((a, b) =>
                a.attributes.title.localeCompare(b.attributes.title)
              )
              .map((item) => (
                <ShowListingChild
                  key={item.id}
                  item={item}
                  ref={refs[item.id]}
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProgrammeShowsList;
