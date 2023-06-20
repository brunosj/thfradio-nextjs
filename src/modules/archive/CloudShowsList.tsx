import React from 'react';
import { CloudShowTypes } from '@/types/ResponsesInterface';
import CloudShowChild from './CloudShowChild';

interface ShowCardListProps {
  items: CloudShowTypes[];
}

const CloudShowCardList = ({ items }: ShowCardListProps) => {
  return (
    <div className='w-full flex flex-wrap gap-6 lg:gap-12 justify-center'>
      {items.map((item, i) => (
        <CloudShowChild key={i} item={item} />
      ))}
    </div>
  );
};

export default CloudShowCardList;
