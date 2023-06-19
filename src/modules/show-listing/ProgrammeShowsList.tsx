import { useState, useEffect } from 'react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShowTypes } from '@/types/ResponsesInterface';
import { CMS_URL } from '@/utils/constants';
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
  const [refs, activeLetter, scrollToShow] = useShowListings(items);

  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const lettersWithShows: string[] = items.map((item) =>
    item.attributes.title[0].toUpperCase()
  );

  const sectionTitleEnglish = isActive ? 'Current Shows' : 'Past Shows';
  const sectionTitleGerman = isActive
    ? 'Aktuelle Sendungen'
    : 'Vergangene Sendungen';

  const getTitleByLocale = () => {
    if (locale === 'de') {
      return sectionTitleGerman;
    } else {
      return sectionTitleEnglish;
    }
  };

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (items && items.length > 0) {
      setIsLoading(false);
    }
  }, [items]);

  return (
    <div className='relative'>
      {isActive && (
        <div className='bg-blue-500 lg:sticky top-[7rem] z-50 opacity-90 w-full'>
          <div className=' layout space-x-2 text-white py-2'>
            {alphabet.map((letter) =>
              lettersWithShows.includes(letter) ? (
                <button key={letter} onClick={() => scrollToShow(letter)}>
                  {letter}
                </button>
              ) : (
                <button
                  key={letter}
                  disabled
                  className='disabled:cursor-not-allowed text-neutral-400'
                >
                  {letter}
                </button>
              )
            )}
          </div>
        </div>
      )}

      {!isActive && <div className='bg-blue-500 opacity-90 py-3' />}
      <div className='layout py-12 bg-orange-500 grid grid-cols-1 gap-6'>
        <h2 className='font-mono text-white text-2xl font-bold mb-4'>
          {getTitleByLocale()}
        </h2>
        {isLoading ? (
          <div className='m-auto text-center'>
            <BarsSpinner color='#1200ff' />
          </div>
        ) : (
          <>
            {items
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
