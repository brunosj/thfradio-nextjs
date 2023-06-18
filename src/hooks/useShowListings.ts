import { useState, useRef, useEffect, createRef } from 'react';
import { ShowTypes } from '@/types/ResponsesInterface';

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
    const show = items.find(
      (item) => item.attributes.title[0].toLowerCase() === letter.toLowerCase()
    );

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
