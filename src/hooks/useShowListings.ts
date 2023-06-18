import { useState, useRef } from 'react';
import { ShowTypes } from '@/types/ResponsesInterface';

interface RefsObject {
  [key: string]: React.RefObject<HTMLDivElement>;
}

const useShowListings = (
  items: ShowTypes[]
): [RefsObject, string, (letter: string) => void] => {
  const [activeLetter, setActiveLetter] = useState<string>('');
  const refs = useRef<RefsObject>({});

  const scrollToShow = (letter: string) => {
    setActiveLetter(letter);
    const show = items.find(
      (item) => item.attributes.title[0].toLowerCase() === letter.toLowerCase()
    );

    if (show && refs.current[show.id]?.current) {
      const boundingRect =
        refs.current[show.id]?.current?.getBoundingClientRect();

      if (boundingRect) {
        const top = boundingRect.top + window.scrollY - 90;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return [refs.current, activeLetter, scrollToShow];
};

export default useShowListings;
