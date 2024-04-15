import { useEffect } from 'react';
import Router from 'next/router';
import type { NextPage } from 'next';
import { DataContext } from '@/context/DataContext';
import { useContext } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/common/layout/Layout';
import type { PageTypes } from '@/types/ResponsesInterface';
import { SEOComponent } from '@/utils/seo';
import ReactMarkdown from 'react-markdown';
import AudioPlayer from '@/modules/live-radio/AudioPlayer';
import { CMS_URL } from '@/utils/constants';
import Image from 'next/image';

const Radiophonix: NextPage<{
  page: PageTypes;
}> = ({ page }) => {
  return (
    <>
      <SEOComponent
        title={page.attributes.title}
        description={page.attributes.description}
      />
      <Layout>
        <div className='bg-blue-500 relative pt-6 lg:pt-10'>
          <div className='layout sectionPy'>
            <h1 className='text-white'>{page.attributes.title}</h1>
          </div>
          <div className='bg-darkBlue layout grid grid-cols-1 lg:grid-cols-2 sectionPy gap-6 lg:gap-24'>
            <div className='markdown lg:max-w-5xl m-auto text-white'>
              <ReactMarkdown>{page.attributes.description}</ReactMarkdown>
            </div>
            <div className='space-y-6 lg:space-y-12 relative'>
              <div className='relative w-full h-[25vh] lg:h-[50vh] rounded-xl'>
                <Image
                  quality={50}
                  src={`${CMS_URL}/uploads/Bildschirmfoto_2024_04_15_um_10_25_32_19055c07ca.png`}
                  fill
                  sizes=''
                  className='object-contain object-center rounded-xl'
                  alt='THF Radio x Teslokratie'
                />
              </div>
              <div className='max-w-full lg:max-w-[60%] mx-auto'>
                <div className='bg-white rounded-xl py-3 px-6 flex items-center gap-6 justify-between'>
                  <h4>Listen to stream here</h4>
                  <AudioPlayer
                    iconClassName='w-6 h-6 lg:w-10 lg:h-10'
                    iconFill='#1200ff'
                    audioSrc='http://91.107.238.209:8000/radio.mp3'
                  />
                </div>
              </div>
              {/* <a
                className='relative w-full h-96 rounded-xl bg-white inline-flex'
                href='https://www.phonix16.de/'
                target='_blank'
              >
                <Image
                  quality={50}
                  src={`${CMS_URL}/uploads/PHONIX_16_logo_blue_RGB_PHOENIX_logo_blue_white_BG_fd424134b8.png`}
                  fill
                  sizes=''
                  className='object-contain object-center rounded-xl p-12'
                  alt='THF Radio x Radiophonix'
                />
              </a> */}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default Radiophonix;

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const pagesResponse = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}pages?locale=${locale}&populate=*`
  );
  const pages = await pagesResponse.json();
  const [page] = pages.data.filter(
    (page: PageTypes) => page.attributes.slug === 'teslokratie'
  );

  return {
    props: {
      page,
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
    revalidate: 10,
  };
};
