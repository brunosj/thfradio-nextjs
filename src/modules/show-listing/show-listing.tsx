import Image from 'next/image';
import Link from 'next/link';
import { ShowTypes } from '@/types/ResponsesInterface';
import { CMS_URL } from '@/utils/constants';

type ShowListing = {
  items: ShowTypes[];
};

const ShowListing = ({ items }: ShowListing) => {
  return (
    <>
      {items.map((item, i) => {
        return (
          <Link
            className='group flex items-center flex-row border border-gray-600 bg-white font-mono duration-200'
            key={i}
            href={`/shows/${item.attributes.slug}`}
          >
            <div className='group relative flex h-full justify-around p-4 duration-200'>
              <div className='w-48 group-hover:opacity-20'>
                <Image
                  src={`${CMS_URL}${item.attributes.picture.data.attributes.url}`}
                  height={600}
                  width={600}
                  // layout='responsive'
                  alt={item.attributes.picture.data.attributes.name}
                />
              </div>
            </div>

            <div className=''>{item.attributes.title}</div>
          </Link>
        );
      })}
    </>
  );
};

export default ShowListing;
