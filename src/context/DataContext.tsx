// contexts/DataContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import {
  CloudShowTypes,
  CalendarEntry,
  ShowTypes,
} from '@/types/ResponsesInterface';
import { useRouter } from 'next/router';

interface DataContextProps {
  children: ReactNode;
}

interface DataContextValue {
  shows: CloudShowTypes[];
  calendarEntries: CalendarEntry[];
  showListings: ShowTypes[];
}

export const DataContext = createContext<DataContextValue | undefined>(
  undefined
);

export const DataProvider: React.FC<DataContextProps> = ({ children }) => {
  const [shows, setShows] = useState<CloudShowTypes[]>([]);
  const [calendarEntries, setCalendarEntries] = useState<CalendarEntry[]>([]);
  const [showListings, setShowListings] = useState<ShowTypes[]>([]);
  const router = useRouter();
  const { locale = 'en' } = router;

  useEffect(() => {
    fetch('/api/shows')
      .then((res) => res.json())
      .then((data) => setShows(data));

    fetch('/api/calendar')
      .then((res) => {
        return res.json();
      })
      .then((data) => setCalendarEntries(data))
      .catch((err) => console.error(err));

    fetch(`/api/showListings?locale=${locale}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => setShowListings(data))
      .catch((err) => console.error(err));
  }, [locale]);

  return (
    <DataContext.Provider value={{ shows, calendarEntries, showListings }}>
      {children}
    </DataContext.Provider>
  );
};
