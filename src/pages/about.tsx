import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/common/layout/Layout';
import Hero from '@/modules/hero/Hero';
import { AboutTypes } from '@/types/ResponsesInterface';
import AboutSection from '@/modules/about-section/aboutSection';
import ImageBanner from '@/modules/image-banner/ImageBanner';
import CodeOfConduct from '@/modules/code-of-conduct/codeOfConduct';
import { SEOComponent } from '@/utils/seo';

const About: NextPage<{
  page: AboutTypes;
}> = ({ page }) => {
  const router = useRouter();
  const { locale: currentLocale = 'en' } = router;

  return (
    <>
      <Layout>
        <SEOComponent
          title={page.attributes.page.title}
          description={page.attributes.page.description}
        />
        <Hero
          description={page.attributes.heroText}
          imageSrc={page.attributes.heroPictures.data[0].attributes.url}
          picturePosition='left'
          showButtons={false}
        />
        <AboutSection
          title={page.attributes.radioSection.title}
          description={page.attributes.radioSection.description}
          button={page.attributes.radioSection.button}
          links={page.attributes.radioSection.links}
        />
        <CodeOfConduct />
        <ImageBanner
          src={page.attributes.imageBanner.data.attributes.url}
          alt='THF Radio at Torhaus'
        />
        <AboutSection
          title={page.attributes.torhausSection.title}
          description={page.attributes.torhausSection.description}
          button={page.attributes.torhausSection.button}
          links={page.attributes.torhausSection.links}
        />
      </Layout>
    </>
  );
};

export default About;

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const pagesResponse = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}about?locale=${locale}&populate[page][populate]=*&populate[radioSection][populate]=*&populate[torhausSection][populate]=*&populate[heroPictures][populate]=*&populate[imageBanner][populate]=*`
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
