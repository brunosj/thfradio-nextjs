import { useRouter } from 'next/router';
import { useContext } from 'react';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DataContext } from '@/context/DataContext';
import Layout from '@/common/layout/Layout';
import { HomepageTypes, TagsList } from '@/types/ResponsesInterface';
import Hero from '@/modules/hero/Hero';
import HomeShowSection from '@/modules/show-listing/HomeShowsSection';
import HomeProgrammeSection from '@/modules/timetable/HomeProgrammeSection';
import HomeArchiveSection from '@/modules/archive/HomeArchiveSection';
import { SEOComponent } from '@/utils/seo';
import HomeNewsSection from '@/modules/news/HomeNewsSection';

const Home: NextPage<{
  page: HomepageTypes;
}> = ({ page }) => {
  const router = useRouter();
  const { locale: currentLocale = 'en' } = router;
  const { cloudShows, calendarEntries, programmeShows, tagsList } =
    useContext(DataContext)!;
  return (
    <>
      <SEOComponent />
      <Layout>
        <Hero
          description={page.attributes.heroText}
          images={page.attributes.heroPictures}
          showButtons={true}
          picturePosition='right'
        />
        <div className='grid grid-cols-2'></div>
        <HomeNewsSection
          title={page.attributes.news.title}
          text={page.attributes.news.text}
        />
        <HomeProgrammeSection
          title={page.attributes.programme.title}
          text={page.attributes.programme.text}
          calendarEntries={calendarEntries}
        />
        <HomeShowSection
          title={page.attributes.shows.title}
          text={page.attributes.shows.text}
          showListings={programmeShows}
          pictures={page.attributes.pictureGallery.data}
        />
        <HomeArchiveSection
          title={page.attributes.archive.title}
          text={page.attributes.archive.text}
          shows={cloudShows}
          tagsList={tagsList}
        />
      </Layout>
    </>
  );
};

export default Home;

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const pagesResponse = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}homepage?locale=${locale}&populate=*`
  );
  const page = await pagesResponse.json();

  return {
    props: {
      page: page.data,
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
    revalidate: 10,
  };
};
