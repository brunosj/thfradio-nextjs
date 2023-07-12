import SectionHeader from '@/common/layout/section/SectionHeader';
import { NewsType } from '@/types/ResponsesInterface';
import Button from '@/common/ui/UIButton';
import { useTranslation } from 'next-i18next';
import NewsCarousel from '../carousel/NewsCarousel';
import { DataContext } from '@/context/DataContext';
import { useContext } from 'react';
import BarsSpinner from '@/common/ui/BarsSpinner';
import { useState, useEffect } from 'react';

interface NewsProps {
  title: string;
  text: string;
}

const HomeNewsSection = ({ title, text }: NewsProps) => {
  const { news } = useContext(DataContext)!;
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  useEffect(() => {
    if (news && news.length > 0) {
      setIsLoading(false);
    }
  }, [news]);

  const newsArray = news.sort(
    (a: NewsType, b: NewsType) =>
      new Date(b.attributes.date).getTime() -
      new Date(a.attributes.date).getTime()
  );

  return (
    <section className='bg-darkBlue sectionPb'>
      <SectionHeader title={title} text={text} />
      <div className='layout'>
        {isLoading ? (
          <div className='flex justify-center pb-12'>
            <BarsSpinner color='#1200ff' />
          </div>
        ) : (
          <NewsCarousel slides={newsArray} />
        )}
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
