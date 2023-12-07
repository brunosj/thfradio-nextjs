import { useContext, useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Layout from '@/common/layout/Layout';
import { SEOComponent } from '@/utils/seo';
import CloudShowChild from '@/modules/archive/CloudShowChild';
import { DataContext } from '@/context/DataContext';
import BarsSpinner from '@/common/ui/BarsSpinner';
import {
  ShowTypes,
  CloudShowTypes,
  TagsList,
} from '@/types/ResponsesInterface';
import { processShows } from '@/utils/showUtils';
import Image from 'next/image';
import { CMS_URL } from '@/utils/constants';
import ShowDetails from '@/modules/show-listing/ProgrammeShowDetails';

interface ShowPage {
  content: ShowTypes;
  otherLocaleContent: ShowTypes;
  shows: CloudShowTypes[];
  tagsList: TagsList;
  filteredPodcasts: CloudShowTypes[];
}
const ShowPage: NextPage<ShowPage> = ({ content, otherLocaleContent }) => {
  const { t } = useTranslation();
  const router = useRouter();
  let locale = router.locale;
  const currentContent = locale === 'en' ? content : otherLocaleContent;
  const { cloudShows } = useContext(DataContext)!;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (cloudShows && cloudShows.length > 0) {
      setIsLoading(false);
    }
  }, [cloudShows]);

  let filteredCloudcasts;
  let sortedShows;
  if (cloudShows) {
    filteredCloudcasts = cloudShows.filter((cloudcast: CloudShowTypes) => {
      const name = cloudcast.name.replace(/[\s-]/g, '').toLowerCase();
      const keyword = currentContent.attributes.keyword
        .replace(/[\s-]/g, '')
        .toLowerCase();

      return new RegExp(keyword, 'i').test(name);
    });

    sortedShows = processShows(filteredCloudcasts);
  }

  const image =
    currentContent.attributes.pictureFullWidth?.data?.attributes.url ||
    currentContent.attributes.picture?.data?.attributes.url ||
    '';

  return (
    <>
      <SEOComponent
        title={currentContent.attributes.title}
        description={currentContent.attributes.description}
        image={`${CMS_URL}${image}`}
      />
      <Layout>
        <div className='relative'>
          {currentContent.attributes.pictureFullWidth?.data ? (
            <div className='relative min-h-fit lg:min-h-[80vh] w-full'>
              <Image
                quality={50}
                src={`${CMS_URL}${currentContent.attributes.pictureFullWidth?.data.attributes.url}`}
                fill
                sizes=''
                className='object-cover object-center'
                alt={currentContent.attributes.title}
              />
              <div className='layout overflow-hidden pt-12 pb-6 '>
                <ShowDetails currentContent={currentContent} />
              </div>
            </div>
          ) : (
            <div className='layout relative min-h-fit lg:min-h-[60vh]  w-full bg-orange-500  pt-12 pb-6'>
              <ShowDetails currentContent={currentContent} />
            </div>
          )}
        </div>

        <div className='bg-darkBlue min-h-[30vh] lg:min-h-[40vh] layout lg:pt-60 pt-12 pb-6 lg:pb-12'>
          <div
            className={` w-full flex flex-wrap gap-6 lg:gap-12 justify-around ${
              sortedShows && sortedShows.length >= 1 ? ' pb-6 lg:pb-12' : ''
            }`}
          >
            {isLoading ? (
              <div className='m-auto text-center'>
                <BarsSpinner color='#ff6314' />
              </div>
            ) : (
              <>
                {sortedShows?.map((item, i) => (
                  <CloudShowChild key={i} item={item} />
                ))}
              </>
            )}
          </div>
        </div>
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
    `${process.env.STRAPI_PUBLIC_API_URL}shows?locale=all&populate=*`
  );
  const initial = await initialRes.json();
  const currentLocaleEntry = initial.data.find(
    (entry: ShowTypes) =>
      entry.attributes.slug === slug && entry.attributes.locale === 'en'
  );

  const otherLocaleEntry = currentLocaleEntry.attributes.localizations.data[0];

  const pictureFullWidth = currentLocaleEntry.attributes.pictureFullWidth;
  const picture = currentLocaleEntry.attributes.picture;

  otherLocaleEntry.attributes.pictureFullWidth = pictureFullWidth;
  otherLocaleEntry.attributes.picture = picture;

  return {
    props: {
      content: currentLocaleEntry,
      otherLocaleContent: otherLocaleEntry,
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

  const paths = items.data.map((item: ShowTypes) => {
    return {
      params: { slug: item.attributes.slug },
      locale: item.attributes.locale,
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
}
