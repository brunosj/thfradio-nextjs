import SectionHeader from '@/common/layout/section/SectionHeader';
import { NewsType } from '@/types/ResponsesInterface';
import Button from '@/common/ui/UIButton';
import { useTranslation } from 'next-i18next';
import NewsCarousel from '../carousel/NewsCarousel';
import { DataContext } from '@/context/DataContext';
import { useContext } from 'react';

interface ShowsProps {
  title: string;
  text: string;
}

const HomeNewsSection = ({ title, text }: ShowsProps) => {
  const { t } = useTranslation();
  const { news } = useContext(DataContext)!;
  const newsArray = news.sort(
    (a: NewsType, b: NewsType) =>
      new Date(b.attributes.date).getTime() -
      new Date(a.attributes.date).getTime()
  );

  return (
    <section className='bg-darkBlue sectionPb'>
      <SectionHeader title={title} text={text} />
      <div className='layout'>
        <NewsCarousel slides={newsArray} />
      </div>
      <div className='pt-12 flex justify-center'>
        <Button
          path='/news'
          color='white-blue'
          ariaLabel={`Navigate to News page`}
        >
          {t('allNews')}
        </Button>
      </div>
    </section>
  );
};

export default HomeNewsSection;
