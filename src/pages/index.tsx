import { useRouter } from 'next/router';
import { useContext } from 'react';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DataContext } from '@/context/DataContext';
import Layout from '@/common/layout/Layout';
import { HomepageTypes } from '@/types/ResponsesInterface';
import Hero from '@/modules/hero/Hero';
import HomeShowSection from '@/modules/show-listing/HomeShowSection';
import HomeProgrammeSection from '@/modules/timetable/HomeProgrammeSection';
import HomeArchiveSection from '@/modules/archive/HomeArchiveSection';
import { SEOComponent } from '@/utils/seo';

const Home: NextPage<{
  page: HomepageTypes;
}> = ({ page }) => {
  const router = useRouter();
  const { locale: currentLocale = 'en' } = router;
  const { cloudShows, calendarEntries, programmeShows } =
    useContext(DataContext)!;

  return (
    <>
      <SEOComponent />
      <Layout>
        <Hero
          description={page.attributes.heroText}
          imageSrc={page.attributes.heroPictures.data[0].attributes.url}
          showButtons={true}
          picturePosition='right'
        />
        <HomeShowSection
          title={page.attributes.shows.title}
          subtitle={page.attributes.shows.subtitle}
          showListings={programmeShows}
          pictures={page.attributes.pictureGallery.data}
        />
        <HomeProgrammeSection
          title={page.attributes.programme.title}
          subtitle={page.attributes.programme.subtitle}
          calendarEntries={calendarEntries}
        />
        <HomeArchiveSection
          title={page.attributes.archive.title}
          subtitle={page.attributes.archive.subtitle}
          shows={cloudShows}
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
