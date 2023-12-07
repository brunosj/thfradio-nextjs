import React from 'react';
import { useRouter } from 'next/router';
import { ShowTypes } from '@/types/ResponsesInterface';
import useShowListings from '@/hooks/useShowListings';
import { CMS_URL } from '@/utils/constants';
import ProgrammeShowsList from './ProgrammeShowsList';

interface ProgrammeShowsProps {
  items: ShowTypes[];
}

const ProgrammeShows: React.FC<ProgrammeShowsProps> = ({ items }) => {
  const router = useRouter();
  const locale = router.locale || 'en';

  return (
    <>
      <ProgrammeShowsList items={items} isActive={true} locale={locale} />
      {/* <ProgrammeShowsList
        items={inactiveShows}
        isActive={false}
        locale={locale}
      /> */}
    </>
  );
};

export default ProgrammeShows;
