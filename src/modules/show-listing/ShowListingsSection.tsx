import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShowTypes } from '@/types/ResponsesInterface';
import { CMS_URL } from '@/utils/constants';
import useShowListings from '@/hooks/useShowListings';

interface ShowListingSectionProps {
  items: ShowTypes[];
  isActive: boolean;
  locale: string;
}

const ShowListingSection: React.FC<ShowListingSectionProps> = ({
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
        {items
          .sort((a, b) => a.attributes.title.localeCompare(b.attributes.title))
          .map((item) => {
            const hasPicture = item.attributes.picture.data;
            const showContentClass = hasPicture
              ? 'pr-3 pl-4 lg:pl-12 space-y-2'
              : 'pl-[5rem] lg:pl-[11rem] pr-3 space-y-2';

            return (
              <div key={item.id} ref={refs[item.id]}>
                <Link
                  className='group flex items-center flex-row border rounded-xl border-blue-600 bg-white hover:bg-blue-500 hover:text-white font-mono duration-200 h-16 lg:h-32'
                  href={`/shows/${item.attributes.slug}`}
                >
                  {item.attributes.picture.data && (
                    <div className='group relative flex h-full justify-around imageHover'>
                      <div className='relative w-16 lg:w-32'>
                        <Image
                          src={`${CMS_URL}${item.attributes.picture.data.attributes.url}`}
                          fill
                          sizes=''
                          className='object-cover rounded-l-xl'
                          alt={item.attributes.picture.data.attributes.name}
                        />
                      </div>
                    </div>
                  )}
                  <div className={showContentClass}>
                    <h4>{item.attributes.title}</h4>
                    {item.attributes.teaserSentence && (
                      <p className='hidden lg:block'>
                        {item.attributes.teaserSentence}
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ShowListingSection;
