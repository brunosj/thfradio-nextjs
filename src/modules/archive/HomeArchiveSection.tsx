import { useState, useEffect } from 'react';
import SectionHeader from '@/common/layout/section/SectionHeader';
import { CloudShowTypes } from '@/types/ResponsesInterface';
import CloudShowsArchive from './CloudShowsArchive';
import BarsSpinner from '@/common/ui/BarsSpinner';

interface ShowsProps {
  title: string;
  subtitle: string;
  shows: CloudShowTypes[];
}

const HomeArchiveSection = ({ title, subtitle, shows }: ShowsProps) => {
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
          <CloudShowsArchive shows={shows} />
        )}
      </div>
    </section>
  );
};

export default HomeArchiveSection;
