import { useState, useEffect } from 'react';
import SectionHeader from '@/common/layout/section/SectionHeader';
import { CloudShowTypes, TagsList } from '@/types/ResponsesInterface';
import CloudShowsArchive from './CloudShowsArchive';
import BarsSpinner from '@/common/ui/BarsSpinner';

interface ArchiveProps {
  title: string;
  subtitle: string;
  shows: CloudShowTypes[];
  tagsList: TagsList;
}

const HomeArchiveSection = ({
  title,
  subtitle,
  shows,
  tagsList,
}: ArchiveProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (shows && shows.length > 0) {
      setIsLoading(false);
    }
  }, [shows]);
  return (
    <section className='bg-blue-800 layout sectionPb' id='archive'>
      <SectionHeader title={title} subtitle={subtitle} />
      <div className='flex w-full m-auto'>
        {isLoading ? (
          <div className='m-auto text-center'>
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
