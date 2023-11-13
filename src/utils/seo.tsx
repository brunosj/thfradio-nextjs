import Head from 'next/head';
import { siteMetadata } from '@/utils/siteMetadata';

export const SEOComponent = ({
  title,
  description,
  image,
}: {
  title?: string;
  description?: string;
  image?:string;
}) => {
  return (
    <Head>
      <title>{`${title ? `${title} | ` : ''} ${siteMetadata.title}`}</title>
      <link rel='icon' href='/favicon.ico' />
      <meta
        name='description'
        content={description || siteMetadata.description}
      />
      <meta property='og:title' content={title || siteMetadata.title} />
      <meta property='og:url' content={siteMetadata.siteUrl} />
      <meta property='og:description' content={description || siteMetadata.description} />
      <meta property='og:image' content={image || siteMetadata.image} />
      <meta property='og:type' content='website' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title || siteMetadata.title} />
      <meta name='twitter:image' content={image || siteMetadata.image} />
      <meta name='twitter:description' content={description || siteMetadata.description} />
    </Head>
  );
};
