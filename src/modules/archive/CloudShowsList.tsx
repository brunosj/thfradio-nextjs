import React from 'react';
import { CloudShowTypes } from '@/types/ResponsesInterface';
import CloudShowChild from './CloudShowChild';

interface ShowCardListProps {
  items: CloudShowTypes[];
  onPlay: (url: string) => void;
}

const CloudShowCardList = ({ items, onPlay }: ShowCardListProps) => {
  return (
    <div className='w-full flex flex-wrap gap-12 justify-center'>
      {items.map((item, i) => (
        <CloudShowChild key={i} item={item} onPlay={onPlay} />
      ))}
    </div>
  );
};

export default CloudShowCardList;
