import { CloudShowTypes, ValidShow } from '@/types/ResponsesInterface';
import { parse, toDate, isValid, format } from 'date-fns';

export const getShowName = (item: CloudShowTypes): string | null => {
  if (!item.name.includes('//')) {
    return null;
  }
  const showNameSplitted = item.name.split('//');
  return showNameSplitted[0].trim();
};

export const getDateFromShow = (item: CloudShowTypes): Date | null => {
  if (!item.name.includes('//')) {
    return null;
  }

  const showNameSplitted = item.name.split('//');
  const dateStr =
    showNameSplitted.length > 0 ? showNameSplitted[1]?.trim() : null;

  if (dateStr) {
    // First try to parse as 'dd.MM.yy'
    let parsedDate = parse(dateStr, 'dd.MM.yy', new Date());

    if (!isValid(parsedDate)) {
      // If it was invalid, try to parse as 'dd.MM.yyyy'
      parsedDate = parse(dateStr, 'dd.MM.yyyy', new Date());
    }

    if (isValid(parsedDate)) {
      return toDate(parsedDate);
    }
  }

  return null;
};

export const getFormattedDateString = (item: CloudShowTypes): string | null => {
  const date = getDateFromShow(item);
  return date ? format(date, 'dd.MM.yyyy') : null;
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
