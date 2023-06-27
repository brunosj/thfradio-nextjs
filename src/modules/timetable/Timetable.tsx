// File: Timetable.tsx
import React from 'react';
import groupByDate from './groupByDate';
import DateEntry from './DateEntry';
import { CalendarEntry } from '@/types/ResponsesInterface';

interface TimetableProps {
  calendarEntries: CalendarEntry[];
}

const Timetable = ({ calendarEntries }: TimetableProps) => {
  const groupedEntries = groupByDate(calendarEntries);

  return (
    <div className='space-y-6 lg:space-y-12 w-full max-w-fit'>
      {Object.entries(groupedEntries).map(([date, entriesForDate], index) => (
        <DateEntry key={index} date={date} entriesForDate={entriesForDate} />
      ))}
    </div>
  );
};

export default Timetable;
