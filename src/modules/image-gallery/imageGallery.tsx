import Image from 'next/image';
import { CMS_URL } from '@/utils/constants';
interface Props {
  items: Array<{
    attributes: {
      url: string;
    };
  }>;
}
const ImageGallery = ({ items }: Props) => {
  return (
    <div className='border border-blue-800 rounded-xl'>
      <div className='flex border-4 lg:border-8 border-white rounded-xl '>
        {items.map((item, i) => (
          <div key={i} className='relative h-48 lg:h-96 w-full'>
            <Image
              src={`${CMS_URL}${item.attributes.url}`}
              alt='THF Radio at Torhaus'
              fill
              className={`object-cover object-center 
            ${i === 0 ? 'rounded-l-lg' : ''} 
            ${i === items.length - 1 ? 'rounded-r-lg' : ''}
            `}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
