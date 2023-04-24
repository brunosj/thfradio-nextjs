import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { ShowTypes, CloudShowTypes } from '@/types/ResponsesInterface';
import Layout from '@/common/layout/layout';
import ShowsArchive from '@/modules/archive/showsArchive';
import ReactMarkdown from 'react-markdown';
import getAllShows from '@/utils/getAllShows';

interface ShowPage {
  content: ShowTypes;
  otherLocaleContent: ShowTypes;
  shows: CloudShowTypes[];
}
const ShowPage: NextPage<ShowPage> = ({
  content,
  otherLocaleContent,
  shows,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  let locale = router.locale;
  const currentContent = locale === 'en' ? content : otherLocaleContent;

  return (
    <>
      <Layout>
        {currentContent.attributes.title}
        <article className='markdown pt-6'>
          <ReactMarkdown>{currentContent.attributes.description}</ReactMarkdown>
        </article>
        <ShowsArchive shows={shows} />
      </Layout>
    </>
  );
};

export default ShowPage;

export async function getStaticProps({
  params,
  locale,
}: {
  params: { slug: string };
  locale: string;
}) {
  const { slug } = params;
  const initialRes = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}shows?locale=all&populate=localizations`
  );
  const initial = await initialRes.json();
  // Find the entry for the current locale
  const currentLocaleEntry = initial.data.find(
    (entry: ShowTypes) =>
      entry.attributes.slug === slug && entry.attributes.locale === 'en'
  );

  // Find the entry for the other locale
  const otherLocaleEntry = currentLocaleEntry.attributes.localizations.data[0];

  // const cloudShowsResponse = await fetch(`${process.env.MIXCLOUD_API}`);
  const cloudShows = await getAllShows();

  const filteredCloudcasts = cloudShows.filter((cloudcast: CloudShowTypes) =>
    new RegExp(currentLocaleEntry.attributes.title, 'i').test(cloudcast.name)
  );

  return {
    props: {
      content: currentLocaleEntry,
      otherLocaleContent: otherLocaleEntry,
      shows: filteredCloudcasts,
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const res = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}shows?locale=all&populate=localizations`
  );
  const items = await res.json();
  const paths = items.data.map((item: ShowTypes) => ({
    params: { slug: item.attributes.slug },
    locale: item.attributes.locale,
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}
