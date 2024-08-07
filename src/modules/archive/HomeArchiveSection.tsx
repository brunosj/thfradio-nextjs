import { useState, useEffect } from 'react';
import SectionHeader from '@/common/layout/section/SectionHeader';
import type { CloudShowTypes, TagsList } from '@/types/ResponsesInterface';
import CloudShowsArchive from './CloudShowsArchive';
import BarsSpinner from '@/common/ui/BarsSpinner';

interface ArchiveProps {
  title: string;
  text: string;
  shows: CloudShowTypes[];
  tagsList: TagsList;
}

const HomeArchiveSection = ({ title, text, shows, tagsList }: ArchiveProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (shows && shows.length > 0) {
      setIsLoading(false);
    }
  }, [shows]);
  return (
    <section className='bg-darkBlue' id='latest'>
      <SectionHeader title={title} text={text} />
      <div className='flex w-full m-auto'>
        {isLoading ? (
          <div className='m-auto text-center pb-12'>
            <BarsSpinner color='#1200ff' />
          </div>
        ) : (
          <CloudShowsArchive shows={shows} tagsList={tagsList} />
        )}
      </div>
    </section>
  );
};

export default HomeArchiveSection;
