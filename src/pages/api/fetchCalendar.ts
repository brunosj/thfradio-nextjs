import { NextApiRequest, NextApiResponse } from 'next';
import ical from 'next-ical';
import {
  isWithinInterval,
  startOfDay,
  endOfDay,
  addDays,
  endOfWeek,
} from 'date-fns';

const fetchCalendar = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const calendarEntriesResponse = await ical.async.fromURL(
      'https://ics.teamup.com/feed/ksn22z3grmc5p1xhzp/7027389.ics'
    );
    const serializedCalendarEntries = JSON.stringify(calendarEntriesResponse);
    const calendarEntries = JSON.parse(serializedCalendarEntries);
    const veventEntries = Object.values(calendarEntries).filter(
      (entry: any) => entry.type === 'VEVENT'
    );

    const now = startOfDay(new Date());
    const endOfCurrentWeek = endOfDay(addDays(endOfWeek(now), 1));
    const upcomingShows = veventEntries.filter((show: any) => {
      const showStart = new Date(show.start);
      const showEnd = new Date(show.end);
      return (
        isWithinInterval(showStart, { start: now, end: endOfCurrentWeek }) &&
        isWithinInterval(showEnd, { start: now, end: endOfCurrentWeek })
      );
    });

    return res.status(200).json(upcomingShows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch calendar entries' });
  }
};

export default fetchCalendar;
