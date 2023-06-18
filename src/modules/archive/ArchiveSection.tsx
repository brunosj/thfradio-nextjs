import SectionHeader from '@/common/layout/section/SectionHeader';
import { CloudShowTypes } from '@/types/ResponsesInterface';
import ShowsArchive from './ShowsArchive';

interface ShowsProps {
  title: string;
  subtitle: string;
  shows: CloudShowTypes[];
}

const ArchiveSection = ({ title, subtitle, shows }: ShowsProps) => {
  return (
    <section className='bg-blue-800 layout sectionPb' id='archive'>
      <SectionHeader title={title} subtitle={subtitle} />
      <div className='m-auto'>
        <ShowsArchive shows={shows} />
      </div>
    </section>
  );
};

export default ArchiveSection;
