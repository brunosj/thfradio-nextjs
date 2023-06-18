import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DataContext } from '@/context/DataContext';
import Layout from '@/common/layout/Layout';
import ShowsArchive from '@/modules/archive/ShowsArchive';
import Timetable from '@/modules/timetable/Timetable';
import {
  PageTypes,
  CloudShowTypes,
  HomepageTypes,
} from '@/types/ResponsesInterface';
import Hero from '@/modules/hero/Hero';
import ShowsSection from '@/modules/show-listing/ShowSection';
import ProgrammeSection from '@/modules/timetable/ProgrammeSection';
import ArchiveSection from '@/modules/archive/ArchiveSection';
import { SEOComponent } from '@/utils/seo';

const Home: NextPage<{
  page: HomepageTypes;
}> = ({ page }) => {
  const router = useRouter();
  const { locale: currentLocale = 'en' } = router;
  const { shows, calendarEntries, showListings } = useContext(DataContext)!;

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
        <ShowsSection
          title={page.attributes.shows.title}
          subtitle={page.attributes.shows.subtitle}
          showListings={showListings}
          pictures={page.attributes.pictureGallery.data}
        />
        <ProgrammeSection
          title={page.attributes.programme.title}
          subtitle={page.attributes.programme.subtitle}
          calendarEntries={calendarEntries}
        />
        <ArchiveSection
          title={page.attributes.archive.title}
          subtitle={page.attributes.archive.subtitle}
          shows={shows}
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
