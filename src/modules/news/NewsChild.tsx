import React from 'react';
import { useRouter } from 'next/router';
import type { NewsType } from '@/types/ResponsesInterface';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { CMS_URL } from '@/utils/constants';
import { format } from 'date-fns/format';

interface NewsProps {
  item: NewsType;
}

const NewsChild: React.FC<NewsProps> = ({ item }) => {
  const router = useRouter();
  const formattedDate = format(new Date(item.attributes.date), 'dd.MM.yyyy');

  return (
    <div
      className='bg-blue-500 text-white rounded-xl'
      id={item.attributes.slug}
    >
      <div className='relative w-full h-48 lg:h-72'>
        <Image
          quality={50}
          src={`${CMS_URL}${item.attributes.picture.data.attributes.url}`}
          fill
          sizes=''
          className='object-cover object-center rounded-t-xl'
          alt={item.attributes.picture.data.attributes.name}
        />
        <div className='absolute top-0 left-0 h-8 w-1/3 lg:w-1/4 bg-orange-500 text-white text-sm lg:text-base flex justify-center rounded-br-xl items-center'>
          <p>{formattedDate}</p>
        </div>
      </div>
      <div className='space-y-6 p-6'>
        <h2>{item.attributes.title}</h2>
        <div className='markdown'>
          <ReactMarkdown>{item.attributes.text}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default NewsChild;
