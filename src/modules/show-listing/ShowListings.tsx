import React from 'react';
import { useRouter } from 'next/router';
import { ShowTypes } from '@/types/ResponsesInterface';
import useShowListings from '@/hooks/useShowListings';
import { CMS_URL } from '@/utils/constants';
import ShowList from './ShowList';

interface ShowListingProps {
  items: ShowTypes[];
}

const ShowListing: React.FC<ShowListingProps> = ({ items }) => {
  const router = useRouter();
  const locale = router.locale || 'en';
  const [refs, activeLetter, scrollToShow] = useShowListings(items);

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
      <ShowList items={activeShows} isActive={true} locale={locale} />
      <ShowList items={inactiveShows} isActive={false} locale={locale} />
    </>
  );
};

export default ShowListing;
