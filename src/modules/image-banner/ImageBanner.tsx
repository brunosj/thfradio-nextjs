import Image from 'next/image';
import { CMS_URL } from '@/utils/constants';
interface Props {
  src: string;
  alt: string;
}
const ImageBanner = ({ src, alt }: Props) => {
  return (
    <div className='relative h-[70vh] w-full'>
      <Image
        src={`${CMS_URL}${src}`}
        alt={alt}
        fill
        className='object-cover object-center'
      />
    </div>
  );
};

export default ImageBanner;
