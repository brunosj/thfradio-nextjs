import type { NextPage } from 'next';
import { useContext } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/common/layout/Layout';
import type { PageTypes } from '@/types/ResponsesInterface';
import ProgrammeShows from '@/modules/show-listing/ProgrammeShows';
import { DataContext } from '@/context/DataContext';
import { SEOComponent } from '@/utils/seo';

const Shows: NextPage<{
  page: PageTypes;
}> = ({ page }) => {
  const { programmeShows } = useContext(DataContext)!;

  return (
    <>
      <SEOComponent
        title={page.attributes.title}
        description={page.attributes.description}
      />
      <Layout>
        <div className='bg-darkBlue relative pt-6 lg:pt-10'>
          <div className='layout sectionPy'>
            <h1 className='text-white'>{page.attributes.title}</h1>
          </div>
        </div>
        <ProgrammeShows items={programmeShows} />
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

  return {
    props: {
      page,
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
    revalidate: 10,
  };
};
