import { useEffect } from 'react';
import Router from 'next/router';
import type { NextPage } from 'next';
import { DataContext } from '@/context/DataContext';
import { useContext } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/common/layout/Layout';
import { PageTypes } from '@/types/ResponsesInterface';
import { SEOComponent } from '@/utils/seo';
import NewsChild from '@/modules/news/NewsChild';
import { NewsType } from '@/types/ResponsesInterface';

const News: NextPage<{
  page: PageTypes;
}> = ({ page }) => {
  const { news } = useContext(DataContext)!;

  return (
    <>
      <SEOComponent
        title={page.attributes.title}
        description={page.attributes.description}
      />
      <Layout>
        <div className='bg-blue-500 relative'>
          <div className='layout sectionPy'>
            <h1 className='text-white'>{page.attributes.title}</h1>
          </div>
          <div className='bg-darkBlue layout grid grid-cols-1 lg:grid-cols-2 sectionPy gap-6 lg:gap-12'>
            {news
              .sort(
                (a: NewsType, b: NewsType) =>
                  new Date(b.attributes.date).getTime() -
                  new Date(a.attributes.date).getTime()
              )
              .map((item: NewsType, i: number) => (
                <NewsChild key={i} item={item} />
              ))}
          </div>
        </div>
      </Layout>
    </>
  );
};
export default News;

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const pagesResponse = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}pages?locale=${locale}&populate=*`
  );
  const pages = await pagesResponse.json();
  const [page] = pages.data.filter(
    (page: PageTypes) => page.attributes.slug === 'news'
  );

  return {
    props: {
      page,
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
    revalidate: 10,
  };
};
