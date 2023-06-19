import React from 'react';
import { CloudShowTypes } from '@/types/ResponsesInterface';
import CloudShowChild from './CloudShowChild';

interface ShowCardListProps {
  items: CloudShowTypes[];
  onPlay: (url: string) => void;
}

const CloudShowCardList = ({ items, onPlay }: ShowCardListProps) => {
  return (
    <div className='w-full flex flex-wrap lg:gap-12 gap-6 justify-start'>
      {items.map((item, i) => (
        <CloudShowChild key={i} item={item} onPlay={onPlay} />
      ))}
    </div>
  );
};

export default CloudShowCardList;
