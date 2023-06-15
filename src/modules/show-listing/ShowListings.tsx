import React, { useState, createRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShowTypes } from '@/types/ResponsesInterface';
import { CMS_URL } from '@/utils/constants';
import ShowListingSection from './ShowListingsSection';
import { useRouter } from 'next/router';

interface ShowListingProps {
  items: ShowTypes[];
}

interface RefsObject {
  [key: string]: React.RefObject<HTMLDivElement>;
}

const ShowListing: React.FC<ShowListingProps> = ({ items }) => {
  const router = useRouter();
  const locale = router.locale || 'en';
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

  const lettersWithShows: string[] = items.map((item) =>
    item.attributes.title[0].toUpperCase()
  );

  const activeShows = items.filter((item) => item.attributes.activeShow);
  const inactiveShows = items.filter((item) => !item.attributes.activeShow);

  return (
    <>
      <ShowListingSection items={activeShows} isActive={true} locale={locale} />
      <ShowListingSection
        items={inactiveShows}
        isActive={false}
        locale={locale}
      />
    </>
  );
};

export default ShowListing;
