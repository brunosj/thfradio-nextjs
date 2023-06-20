import { CloudShowTypes, ValidShow } from '@/types/ResponsesInterface';
import { parse, toDate } from 'date-fns';

const getDateFromShow = (item: CloudShowTypes): Date | null => {
  if (!item.name.includes('//')) {
    return null;
  }

  const showNameSplitted = item.name.split('//');
  const dateStr =
    showNameSplitted.length > 0 ? showNameSplitted[1]?.trim() : null;

  if (dateStr && dateStr.length >= 8) {
    const parsedDate = parse(dateStr, 'dd.MM.yy', new Date());
    return toDate(parsedDate);
  }

  return null;
};

const getValidShows = (shows: CloudShowTypes[]): ValidShow[] => {
  return shows
    .map((show) => {
      const date = getDateFromShow(show);
      return date ? { ...show, date } : null;
    })
    .filter((show): show is ValidShow => show !== null);
};

const sortShows = (shows: ValidShow[]): ValidShow[] => {
  return shows.sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });
};

export const processShows = (shows: CloudShowTypes[]): ValidShow[] => {
  const validShows = getValidShows(shows);
  const sortedShows = sortShows(validShows);
  return sortedShows;
};
