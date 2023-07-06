import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { CMS_URL } from '@/utils/constants';
import Button from '@/common/ui/UIButton';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import clsx from 'clsx';
import ImageCarousel from '../carousel/ImageCarousel';
import { Pictures } from '@/types/ResponsesInterface';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

type HeroProps = {
  description: string;
  images: Pictures;
  showButtons: boolean;
  picturePosition: 'left' | 'right';
};

const Hero = ({
  description,
  images,
  showButtons,
  picturePosition,
}: HeroProps) => {
  const { t } = useTranslation();
  const handleAnchorLinkClick = useSmoothScroll();

  return (
    <section className='px-0 lg:px-16 bg-blue-500 grid grid-cols-1 lg:grid-cols-2 pt-6 lg:py-12 gap-6 lg:gap-12'>
      <div
        className={clsx(
          picturePosition === 'right' ? 'order-1' : 'order-2',
          'hidden border-2 border-white lg:flex h-full items-center rounded-xl'
        )}
      >
        <div className='lg:px-12 lg:py-16 xl:py-24 px-6 py-12 text-center text-white markdown'>
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      </div>

      <div
        className={clsx(
          picturePosition === 'right' ? ' order-2' : 'order-1',
          'lg:border-2 border-white relative rounded-xl'
        )}
      >
        <div className='lg:hidden absolute inset-0 flex flex-col items-center justify-center px-6 py-12 text-center z-40'>
          <div className='markdown text-white'>
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
          <div className='pt-6 flex justify-center order-3 '>
            <Button
              path='/about'
              color='white-orange'
              ariaLabel={`Navigate to About page`}
            >
              {t('aboutUs')}
            </Button>
          </div>
        </div>
        <div>
          <ImageCarousel slides={images} />
        </div>
      </div>
      {showButtons && (
        <>
          <div className='hidden lg:flex justify-center order-3 pb-6 lg:pb-0'>
            <Button
              path='/about'
              color='white-orange'
              ariaLabel={`Navigate to About page`}
            >
              {t('aboutUs')}
            </Button>
          </div>
          <div className='hidden lg:flex justify-center order-4 pb-6 lg:pb-0'>
            <Button
              path='/#latest'
              color='white-orange'
              ariaLabel={`Navigate to Latest shows`}
              onClick={(e) => handleAnchorLinkClick(e, '/#latest')}
            >
              {t('latestShows')}
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

export default Hero;
