import SectionHeader from '@/common/layout/section/SectionHeader';
import ShowListing from './ShowListingChild';
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

const ShowsSection = ({ title, subtitle, pictures }: ShowsProps) => {
  const { t } = useTranslation();

  return (
    <section className='bg-orange-500 layout sectionPb'>
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

export default ShowsSection;
