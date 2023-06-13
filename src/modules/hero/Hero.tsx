import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { CMS_URL } from '@/utils/constants';

type HeroProps = {
  description: string;
  imageSrc: string;
};

const Hero = ({ description, imageSrc }: HeroProps) => {
  return (
    <section className='px-0 md:px-16 bg-blue-500 grid grid-cols-1 md:grid-cols-2 py-0 md:py-12 gap-12'>
      <div className='hidden border border-white md:flex h-full items-center'>
        <div className='md:px-12 md:py-24 px-6 py-12 text-center text-white markdown'>
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      </div>
      <div className='border border-white relative'>
        <div className='md:hidden absolute inset-0 flex flex-col items-center justify-center md:px-12 md:py-24 px-6 py-12 text-center text-white markdown '>
          <div className='text'>
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
        </div>
        <div className='text-center text-white markdown'>
          <div className='relative  h-[30rem] w-full'>
            <Image
              src={`${CMS_URL}${imageSrc}`}
              alt='THF Radio at Torhaus'
              fill
              className='object-cover'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
