// File: Timetable.tsx
import React from 'react';
import groupByDate from './groupByDate';
import DateEntry from './DateEntry';
import type { CalendarEntry } from '@/types/ResponsesInterface';

interface TimetableProps {
  calendarEntries: CalendarEntry[];
}

const Timetable = ({ calendarEntries }: TimetableProps) => {
  const groupedEntries = groupByDate(calendarEntries);

  return (
    <div className='layout space-y-6 lg:space-y-12 w-full max-w-full xl:max-w-[80%] '>
      {Object.entries(groupedEntries).map(([date, entriesForDate], index) => (
        <DateEntry key={index} date={date} entriesForDate={entriesForDate} />
      ))}
    </div>
  );
};

export default Timetable;
