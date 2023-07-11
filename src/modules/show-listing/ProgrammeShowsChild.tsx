import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { ShowTypes } from '@/types/ResponsesInterface';
import { CMS_URL } from '@/utils/constants';

interface ProgrammeShowsProps {
  item: ShowTypes;
}

const ProgrammeShowsChild = React.forwardRef<
  HTMLDivElement,
  ProgrammeShowsProps
>(function ShowListingChild({ item }, ref) {
  const { t } = useTranslation();
  const hasPicture = item.attributes.picture.data;
  const showContentClass = hasPicture
    ? 'pr-3 pl-4 lg:pl-12 space-y-2'
    : 'pl-[5rem] lg:pl-[11rem] pr-3 space-y-2';

  return (
    <div key={item.id} ref={ref}>
      <Link
        className='group flex items-center flex-row border rounded-xl border-blue-600 bg-white hover:bg-blue-500 hover:text-white font-mono duration-200 h-20 lg:h-32 relative'
        href={`/shows/${item.attributes.slug}`}
      >
        {item.attributes.picture.data && (
          <div className='group relative flex h-full justify-around imageHover'>
            <div className='relative w-16 lg:w-32'>
              <Image
                src={`${CMS_URL}${item.attributes.picture.data.attributes.url}`}
                fill
                sizes=''
                className='object-cover rounded-l-xl'
                alt={item.attributes.picture.data.attributes.name}
              />
            </div>
          </div>
        )}
        <div className={showContentClass}>
          <h4>{item.attributes.title}</h4>
          {item.attributes.teaserSentence && (
            <p className='hidden lg:block'>{item.attributes.teaserSentence}</p>
          )}
        </div>
        {item.attributes.activeShow && (
          <div
            className='absolute -top-2 right-2 bg-blue-500 rounded-xl text-white py-1 px-2 text-xs lg:text-sm
        '
          >
            <p>{t('ongoing')}</p>
          </div>
        )}
      </Link>
    </div>
  );
});

export default ProgrammeShowsChild;
