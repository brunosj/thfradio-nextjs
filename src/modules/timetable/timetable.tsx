import { startOfDay, endOfDay } from 'date-fns';
import { Wave } from '@/common/assets/WaveSVG';

interface CalendarEntry {
  start: string;
  end: string;
  summary: string;
}

interface TimetableProps {
  calendarEntries: CalendarEntry[];
  locale: string;
}

const Timetable = ({ calendarEntries, locale }: TimetableProps) => {
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

  const groupedEntries = groupByDate(calendarEntries);

  return (
    <div className='bg-orange-500 sectionPy'>
      <div className='max-w-5xl m-auto space-y-12'>
        {Object.entries(groupedEntries).map(([date, entriesForDate], index) => {
          const startDate = new Date(date);
          const dayName = startDate.toLocaleString(locale, {
            weekday: 'long',
          });
          const formattedDate = startDate.toLocaleString(locale, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          });

          return (
            <div
              key={index}
              className='layout flex flex-col lg:flex-row gap-12 font-mono w-full bg-white rounded-xl border border-blue-800 py-6'
            >
              <div className='w-1/4 flex justify-between'>
                <h2 className='font-bold'>{dayName}</h2>
                <h3 className=''>{formattedDate}</h3>
              </div>
              <div className='w-3/4 space-y-6'>
                {entriesForDate.map((entry, entryIndex) => {
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
                  return (
                    <div key={entryIndex} className='flex gap-12'>
                      <div className='flex'>
                        <p>
                          {startTime}
                          <span className='px-2 lg:px-3'>
                            <Wave />
                          </span>
                          {endTime}
                        </p>
                      </div>
                      <p>{entry.summary}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timetable;
