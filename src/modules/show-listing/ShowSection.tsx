import SectionHeader from '@/common/layout/section/SectionHeader';
import ShowListing from './ShowListingChild';
import { ShowTypes } from '@/types/ResponsesInterface';

interface ShowsProps {
  title: string;
  subtitle: string;
  showListings: ShowTypes[];
}

const ShowsSection = ({ title, subtitle, showListings }: ShowsProps) => {
  return (
    <section className='bg-orange-500 layout sectionPb'>
      <SectionHeader title={title} subtitle={subtitle} />
      <div className='max-w-6xl m-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12   auto-rows-fr h-full'>
        <ShowListing items={showListings} />
      </div>
    </section>
  );
};

export default ShowsSection;
