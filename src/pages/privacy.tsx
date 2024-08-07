import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/common/layout/Layout';
import type { PageTypes } from '@/types/ResponsesInterface';
import { SEOComponent } from '@/utils/seo';
import ReactMarkdown from 'react-markdown';
import GenericPage from '@/modules/generic-page/GenericPage';

const Privacy: NextPage<{
  page: PageTypes;
}> = ({ page }) => {
  return (
    <>
      <SEOComponent
        title={page.attributes.title}
        description={page.attributes.description}
      />
      <Layout>
        <GenericPage
          title={page.attributes.title}
          description={page.attributes.description}
        />
      </Layout>
    </>
  );
};
export default Privacy;

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const pagesResponse = await fetch(
    `${process.env.STRAPI_PUBLIC_API_URL}pages?locale=${locale}&populate=*`
  );
  const pages = await pagesResponse.json();
  const [page] = pages.data.filter(
    (page: PageTypes) => page.attributes.slug === 'privacy'
  );

  return {
    props: {
      page,
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
    revalidate: 10,
  };
};
