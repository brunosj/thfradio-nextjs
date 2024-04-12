import SectionHeader from '@/common/layout/section/SectionHeader';
import ShowListing from './ProgrammeShows';
import type { ShowTypes, PictureType } from '@/types/ResponsesInterface';
import Button from '@/common/ui/UIButton';
import { useTranslation } from 'next-i18next';
import ImageGallery from '../image-gallery/imageGallery';

interface ShowsProps {
  title: string;
  showListings?: ShowTypes[];
  pictures: PictureType[];
  text: string;
}

const HomeShowSection = ({ title, pictures, text }: ShowsProps) => {
  const { t } = useTranslation();

  return (
    <section className='bg-orange-500 sectionPb'>
      <SectionHeader title={title} text={text} />
      <div className='layout'>
        <ImageGallery items={pictures} />
      </div>
      <div className='pt-12 flex justify-center'>
        <Button
          path='/shows'
          color='white-blue'
          ariaLabel={`Navigate to Shows page`}
        >
          {t('allShows')}
        </Button>
      </div>
    </section>
  );
};

export default HomeShowSection;
