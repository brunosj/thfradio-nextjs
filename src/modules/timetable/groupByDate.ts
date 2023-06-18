// File: GroupByDate.ts
import { CalendarEntry } from '@/types/ResponsesInterface';
import { startOfDay } from 'date-fns';

const groupByDate = (entries: CalendarEntry[]) => {
  return entries.reduce((acc: { [key: string]: CalendarEntry[] }, entry) => {
    const startDate = startOfDay(new Date(entry.start)).toISOString();
    if (!acc[startDate]) {
      acc[startDate] = [];
    }
    acc[startDate].push(entry);

    return acc;
  }, {});
};

export default groupByDate;
