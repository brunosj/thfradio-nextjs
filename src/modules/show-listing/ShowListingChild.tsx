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
      {items
        .sort((a, b) => a.attributes.title.localeCompare(b.attributes.title))
        .map((item, i) => {
          return (
            <Link
              className='group flex items-center flex-row border rounded-xl border-blue-600  bg-white hover:bg-blue-500 hover:text-white font-mono duration-200 space-x-6 h-full'
              key={i}
              href={`/shows/${item.attributes.slug}`}
            >
              {item.attributes.picture.data ? (
                <>
                  <div className='group relative flex h-full justify-around imageHover'>
                    <div className='w-24 rounded-l-xl'>
                      <Image
                        src={`${CMS_URL}${item.attributes.picture.data.attributes.url}`}
                        height={600}
                        width={600}
                        className=' rounded-l-xl'
                        alt={item.attributes.picture.data.attributes.name}
                      />
                    </div>
                  </div>
                  <div className='pr-3'>
                    <h4>{item.attributes.title}</h4>
                  </div>
                </>
              ) : (
                <div className='flex items-center pl-[7.5rem] h-full pr-3'>
                  <h4>{item.attributes.title}</h4>
                </div>
              )}
            </Link>
          );
        })}
    </>
  );
};

export default ShowListing;
