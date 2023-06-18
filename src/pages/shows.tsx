import type { NextPage } from 'next';
import { useContext } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/common/layout/Layout';
import { PageTypes, ShowTypes } from '@/types/ResponsesInterface';
import ShowListing from '@/modules/show-listing/ShowListings';
import { DataContext } from '@/context/DataContext';
import { SEOComponent } from '@/utils/seo';

const Shows: NextPage<{
  page: PageTypes;
}> = ({ page }) => {
  const { showListings } = useContext(DataContext)!;

  return (
    <>
      <SEOComponent
        title={page.attributes.title}
        description={page.attributes.description}
      />
      <Layout>
        <div className='bg-blue-800 relative'>
          <div className='layout sectionPy'>
            <h1 className='text-white'>{page.attributes.title}</h1>
          </div>
        </div>
        <ShowListing items={showListings} />
      </Layout>
    </>
  );
};
export default Shows;

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const pagesResponse = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}pages?locale=${locale}&populate=*`
  );
  const pages = await pagesResponse.json();
  const [page] = pages.data.filter(
    (page: PageTypes) => page.attributes.slug === 'shows'
  );

  const showListingsResponse = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}shows?locale=${locale}&populate=*`
  );
  const showListings = await showListingsResponse.json();

  return {
    props: {
      page,
      showListings: showListings.data,
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
    revalidate: 10,
  };
};


