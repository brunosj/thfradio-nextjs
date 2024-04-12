import type { NextPage } from 'next';
import Layout from '@/common/layout/Layout';
import type { PageTypes } from '@/types/ResponsesInterface';
import { SEOComponent } from '@/utils/seo';
import { DISCORD_INVITE_URL } from '@/utils/constants';
import DiscordEmbed from '@/modules/chat/DiscordEmbed';
import { XMarkIcon } from '@/common/assets/XMarkIcon';
import { TbBrandDiscord } from 'react-icons/tb';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

const Chat: NextPage<{
  page: PageTypes;
}> = ({ page }) => {
  return (
    <>
      <SEOComponent title='THF Radio Chat' />
      {/* <Layout> */}
      <div className='relative'>
        <div className='absolute left-0 w-full bg-orange-500 text-white h-[63px] px-4'>
          <div className='flex space-x-4 items-center h-full'>
            <span className='flex-grow '>
              <Link href='/'>THF Radio</Link>
            </span>
            <TbBrandDiscord className='w-6 h-6' />
          </div>
        </div>
        <div className='pt-[5.6rem] h-screen w-[full] bg-[#303236]'>
          <DiscordEmbed />
        </div>
      </div>
      {/* </Layout> */}
    </>
  );
};
export default Chat;

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
    revalidate: 10,
  };
};
