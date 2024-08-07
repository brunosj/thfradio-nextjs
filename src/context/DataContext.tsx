// contexts/DataContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import type {
  CloudShowTypes,
  CalendarEntry,
  ShowTypes,
  TagsList,
  NewsType,
} from '@/types/ResponsesInterface';
import { useRouter } from 'next/router';

interface DataContextProps {
  children: ReactNode;
}

interface DataContextValue {
  cloudShows: CloudShowTypes[];
  news: NewsType[];
  calendarEntries: CalendarEntry[];
  programmeShows: ShowTypes[];
  tagsList: TagsList;
}

export const DataContext = createContext<DataContextValue | undefined>(
  undefined
);

export const DataProvider: React.FC<DataContextProps> = ({ children }) => {
  const [cloudShows, setCloudShows] = useState<CloudShowTypes[]>([]);
  const [calendarEntries, setCalendarEntries] = useState<CalendarEntry[]>([]);
  const [programmeShows, setProgrammeShows] = useState<ShowTypes[]>([]);
  const [news, setNews] = useState<NewsType[]>([]);
  const [tagsList, setTagsList] = useState<TagsList>({
    attributes: { tag: [] },
  });

  const router = useRouter();
  const { locale = 'en' } = router;

  useEffect(() => {
    fetch('/api/fetchCloudShows')
      .then((res) => res.json())
      .then((data) => setCloudShows(data));

    fetch('/api/fetchTagList')
      .then((res) => res.json())
      .then((data) => setTagsList(data));

    fetch('/api/fetchCalendar')
      .then((res) => {
        return res.json();
      })
      .then((data) => setCalendarEntries(data))
      .catch((err) => console.error(err));

    fetch(`/api/fetchProgrammeShows?locale=${locale}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => setProgrammeShows(data))
      .catch((err) => console.error(err));

    fetch(`/api/fetchNews?locale=${locale}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => setNews(data))
      .catch((err) => console.error(err));
  }, [locale]);

  return (
    <DataContext.Provider
      value={{ cloudShows, calendarEntries, programmeShows, tagsList, news }}
    >
      {children}
    </DataContext.Provider>
  );
};
