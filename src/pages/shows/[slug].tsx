import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import {
  ShowTypes,
  CloudShowTypes,
  TagsList,
} from '@/types/ResponsesInterface';
import Layout from '@/common/layout/Layout';
import CloudShowsArchive from '@/modules/archive/CloudShowsArchive';
import ReactMarkdown from 'react-markdown';
import getAllShows from '@/utils/getAllShows';
import { AiOutlineInstagram } from 'react-icons/ai';
import { CiMail } from 'react-icons/ci';
import { SlSocialSoundcloud } from 'react-icons/sl';
import Link from 'next/link';
import { SEOComponent } from '@/utils/seo';
import CloudShowCardList from '@/modules/archive/CloudShowsList';
import CloudShowChild from '@/modules/archive/CloudShowChild';

interface ShowPage {
  content: ShowTypes;
  otherLocaleContent: ShowTypes;
  shows: CloudShowTypes[];
  tagsList: TagsList;
}
const ShowPage: NextPage<ShowPage> = ({
  content,
  otherLocaleContent,
  shows,
  tagsList,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  let locale = router.locale;
  const currentContent = locale === 'en' ? content : otherLocaleContent;

  const getGermanDay = (day: string): string => {
    if (locale === 'en') {
      return day.charAt(0).toUpperCase() + day.slice(1);
    }

    switch (day) {
      case 'monday':
        return 'Montag';
      case 'tuesday':
        return 'Dienstag';
      case 'wednesday':
        return 'Mittwoch';
      case 'thursday':
        return 'Donnerstag';
      case 'friday':
        return 'Freitag';
      case 'saturday':
        return 'Samstag';
      case 'sunday':
        return 'Sonntag';
      default:
        return day;
    }
  };

  const getGermanFrequency = (frequency: string): string => {
    if (locale === 'en') {
      return frequency.charAt(0).toUpperCase() + frequency.slice(1);
    }

    switch (frequency) {
      case 'bi-weekly':
        return 'Zweiwöchentlich';
      case 'weekly':
        return 'Wöchentlich';
      case 'monthly':
        return 'Monatlich';
      case 'bi-monthly':
        return 'Zweimonatlich';
      case 'occasionally':
        return 'Gelegentlich';
      default:
        return frequency;
    }
  };

  const formatTime = (time: string): string => {
    return time ? time.slice(0, 5) : '';
  };

  const handlePlay = (url: string) => {
    document.dispatchEvent(
      new CustomEvent('mixcloud-show-change', {
        detail: { url },
      })
    );
  };

  return (
    <>
      <SEOComponent
        title={currentContent.attributes.title}
        description={currentContent.attributes.description}
      />
      <Layout>
        <div className='bg-orange-500 text-white h-32 lg:h-64 flex items-center'>
          <div className='layout'>
            <h1 className=''>{currentContent.attributes.title}</h1>
          </div>
        </div>

        <div
          className='bg-blue-500 text-white layout py-6  space-y-2'
          id='showDetails'
        >
          {currentContent.attributes.frequency &&
            currentContent.attributes.day &&
            currentContent.attributes.startTime &&
            currentContent.attributes.endTime && (
              <h4>
                {getGermanFrequency(currentContent.attributes.frequency)},{' '}
                {getGermanDay(currentContent.attributes.day)}{' '}
                {formatTime(currentContent.attributes.startTime)} -{' '}
                {formatTime(currentContent.attributes.endTime)}
              </h4>
            )}
          <div className='flex space-x-3'>
            {currentContent.attributes.instagram && (
              <Link href={currentContent.attributes.instagram} target='_blank'>
                <AiOutlineInstagram className='w-6 h-6 textHover' />
              </Link>
            )}
            {currentContent.attributes.mail && (
              <Link
                href={`mailto:${currentContent.attributes.mail}`}
                target='_blank'
              >
                <CiMail className='w-6 h-6 textHover' />
              </Link>
            )}
            {currentContent.attributes.soundcloud && (
              <Link href={currentContent.attributes.soundcloud} target='_blank'>
                <SlSocialSoundcloud className='w-6 h-6 textHover' />
              </Link>
            )}
          </div>
        </div>
        <div className='bg-blue-800 min-h-[60vh] lg:min-h-[40vh] layout'>
          <article className='pt-12 pb-6 lg:pt-12 lg:pb-6 markdown text-white '>
            <ReactMarkdown>
              {currentContent.attributes.description}
            </ReactMarkdown>
          </article>
          <div
            className={` w-full flex flex-wrap gap-6 lg:gap-12 justify-around ${
              shows.length >= 1 ? ' pb-6 lg:pb-12' : ''
            }`}
          >
            {shows.map((item, i) => (
              <CloudShowChild key={i} item={item} onPlay={handlePlay} />
            ))}
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

  const cloudShows = await getAllShows();
  const filteredCloudcasts = cloudShows.filter((cloudcast: CloudShowTypes) =>
    new RegExp(currentLocaleEntry.attributes.keyword, 'i').test(cloudcast.name)
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
