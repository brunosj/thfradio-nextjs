import React, { useState, createRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShowTypes } from '@/types/ResponsesInterface';
import { CMS_URL } from '@/utils/constants';

interface ShowListingProps {
  items: ShowTypes[];
}

interface RefsObject {
  [key: string]: React.RefObject<HTMLDivElement>;
}

const ShowListing: React.FC<ShowListingProps> = ({ items }) => {
  const [activeLetter, setActiveLetter] = useState<string>('');
  const refs: RefsObject = items.reduce((acc: RefsObject, item) => {
    acc[item.id] = createRef();
    return acc;
  }, {});

  const scrollToShow = (letter: string) => {
    setActiveLetter(letter);
    const show = items.find(
      (item) => item.attributes.title[0].toLowerCase() === letter.toLowerCase()
    );
    if (show && refs[show.id]?.current) {
      const boundingRect = refs[show.id].current?.getBoundingClientRect();
      if (boundingRect) {
        const top = boundingRect.top + window.scrollY - 90;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  // Create a new array of letters that have shows associated with them
  const lettersWithShows: string[] = items.map((item) =>
    item.attributes.title[0].toUpperCase()
  );

  return (
    <div className='relative'>
      <div className='bg-blue-500 md:sticky top-12 z-50 opacity-90'>
        <div className='layout space-x-2 text-white py-2'>
          {alphabet.map((letter) =>
            lettersWithShows.includes(letter) ? (
              <button key={letter} onClick={() => scrollToShow(letter)}>
                {letter}
              </button>
            ) : (
              <button
                key={letter}
                disabled
                className=' disabled:cursor-not-allowed text-neutral-400'
              >
                {letter}
              </button>
            )
          )}
        </div>
      </div>
      <div className='layout py-12  bg-orange-500 grid grid-cols-1 gap-6'>
        {items
          .sort((a, b) => a.attributes.title.localeCompare(b.attributes.title))
          .map((item) => {
            const hasPicture = item.attributes.picture.data;
            const showContentClass = hasPicture
              ? 'pr-3 pl-4 md:pl-12 space-y-2'
              : 'pl-[5rem] md:pl-[11rem] pr-3 space-y-2';

            return (
              <div key={item.id} ref={refs[item.id]}>
                <Link
                  className='group flex items-center flex-row border rounded-xl border-blue-600  bg-white hover:bg-blue-500 hover:text-white font-mono duration-200 h-16 md:h-32 '
                  href={`/shows/${item.attributes.slug}`}
                >
                  {item.attributes.picture.data && (
                    <div className='group relative flex h-full justify-around imageHover'>
                      <div className='w-16 md:w-32'>
                        <Image
                          src={`${CMS_URL}${item.attributes.picture.data.attributes.url}`}
                          fill
                          className='object-cover rounded-l-xl'
                          alt={item.attributes.picture.data.attributes.name}
                        />
                      </div>
                    </div>
                  )}
                  <div className={showContentClass}>
                    <h4>{item.attributes.title}</h4>
                    {item.attributes.teaserSentence && (
                      <p className='hidden md:block'>
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

export default ShowListing;
