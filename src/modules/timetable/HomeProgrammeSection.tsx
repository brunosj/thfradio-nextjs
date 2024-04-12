import { useState, useEffect } from 'react';
import SectionHeader from '@/common/layout/section/SectionHeader';
import type { CalendarEntry } from '@/types/ResponsesInterface';
import Timetable from './Timetable';
import BarsSpinner from '@/common/ui/BarsSpinner';

interface ProgrammeProps {
  title: string;
  text: string;
  calendarEntries: CalendarEntry[];
}

const HomeProgrammeSection = ({
  title,
  text,
  calendarEntries,
}: ProgrammeProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (calendarEntries && calendarEntries.length > 0) {
      setIsLoading(false);
    }
  }, [calendarEntries]);

  return (
    <section className='bg-blue-500 sectionPb' id='programme'>
      <SectionHeader title={title} text={text} />
      <div className='flex justify-around m-auto'>
        {isLoading ? (
          <div className='m-auto text-center'>
            <BarsSpinner color='#ff6314' />
          </div>
        ) : (
          <Timetable calendarEntries={calendarEntries} />
        )}
      </div>
    </section>
  );
};

export default HomeProgrammeSection;
