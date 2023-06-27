// File: CalendarEntry.tsx
import React from 'react';
import { CalendarEntry as CalendarEntryProps } from '@/types/ResponsesInterface';

import { Wave } from '@/common/assets/WaveSVG';
import { useRouter } from 'next/router';
import { time } from 'console';

const CalendarEntry = ({ entry }: { entry: CalendarEntryProps }) => {
  const router = useRouter();
  const { locale = 'en' } = router;

  const entryStartDate = new Date(entry.start);
  const entryEndDate = new Date(entry.end);
  const startTime = entryStartDate.toLocaleString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const endTime = entryEndDate.toLocaleString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const currentTime = new Date();

  const isCurrentShow =
    entryStartDate <= currentTime && entryEndDate >= currentTime;

  const summaryClass = isCurrentShow
    ? 'bg-orange-500 text-white font-bold px-1'
    : '';

  const timeClass = isCurrentShow ? ' bg-orange-500 text-white' : '';

  return (
    <div className='flex flex-col lg:flex-row gap-0 lg:gap-12'>
      <div className='w-full max-w-fit flex'>
        <p className=''>
          {startTime}
          <span className='px-2 lg:px-3'>
            <Wave />
          </span>
          {endTime}
        </p>
      </div>
      <div className='w-full max-w-fit '>
        <span className={summaryClass}>{entry.summary}</span>
      </div>
    </div>
  );
};

export default CalendarEntry;
