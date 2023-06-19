import SectionHeader from '@/common/layout/section/SectionHeader';
import ShowListing from './ProgrammeShows';
import { ShowTypes, PictureType } from '@/types/ResponsesInterface';
import Button from '@/common/ui/UIButton';
import { useTranslation } from 'next-i18next';
import ImageGallery from '../image-gallery/imageGallery';

interface ShowsProps {
  title: string;
  subtitle: string;
  showListings?: ShowTypes[];
  pictures: PictureType[];
}

const HomeShowSection = ({ title, subtitle, pictures }: ShowsProps) => {
  const { t } = useTranslation();

  return (
    <section className='bg-orange-500 sectionPb'>
      <SectionHeader title={title} subtitle={subtitle} />
      <ImageGallery items={pictures} />
      <div className='pt-12 flex justify-center'>
        <Button path='/shows' color='white'>
          {t('allShows')}
        </Button>
      </div>
    </section>
  );
};

export default HomeShowSection;
