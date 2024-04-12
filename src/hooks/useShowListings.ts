import { useState, useRef, useEffect, createRef } from 'react';
import type { ShowTypes } from '@/types/ResponsesInterface';

interface RefsObject {
  [key: string]: React.RefObject<HTMLDivElement>;
}

const useShowListings = (
  items: ShowTypes[]
): [RefsObject, string, (letter: string) => void] => {
  const [activeLetter, setActiveLetter] = useState<string>('');
  const refs = useRef<RefsObject>({});

  useEffect(() => {
    items.forEach((item) => {
      refs.current[item.id] = createRef();
    });
  }, [items]);

  const scrollToShow = (letter: string) => {
    setActiveLetter(letter);

    const showsWithLetter = items.filter(
      (item) => item.attributes.title[0].toLowerCase() === letter.toLowerCase()
    );

    const sortedShows = showsWithLetter.sort((a, b) =>
      a.attributes.title.localeCompare(b.attributes.title)
    );

    const show = sortedShows[0];
    console.log(show);

    if (show && refs.current[show.id]?.current) {
      const boundingRect =
        refs.current[show.id]?.current?.getBoundingClientRect();

      if (boundingRect) {
        const top = boundingRect.top + window.scrollY - 160;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return [refs.current, activeLetter, scrollToShow];
};

export default useShowListings;
