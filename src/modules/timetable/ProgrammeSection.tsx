import SectionHeader from '@/common/layout/section/SectionHeader';
import { CalendarEntry } from '@/types/ResponsesInterface';
import Timetable from './Timetable';

interface ProgrammeProps {
  title: string;
  subtitle: string;
  calendarEntries: CalendarEntry[];
}

const ProgrammeSection = ({
  title,
  subtitle,
  calendarEntries,
}: ProgrammeProps) => {
  return (
    <section className='bg-blue-500 layout sectionPb' id='programme'>
      <SectionHeader title={title} subtitle={subtitle} />
      <div className='max-w-6xl m-auto'>
        <Timetable calendarEntries={calendarEntries} />
      </div>
    </section>
  );
};

export default ProgrammeSection;
