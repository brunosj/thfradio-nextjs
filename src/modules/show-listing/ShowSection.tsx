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
    </section>
  );
};

export default ShowsSection;
