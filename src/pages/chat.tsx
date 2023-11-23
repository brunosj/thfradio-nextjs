import type { NextPage } from 'next';
import Layout from '@/common/layout/Layout';
import { PageTypes } from '@/types/ResponsesInterface';
import { SEOComponent } from '@/utils/seo';
import { DISCORD_INVITE_URL } from '@/utils/constants';
import DiscordEmbed from '@/modules/chat/DiscordEmbed';
import { XMarkIcon } from '@/common/assets/XMarkIcon';
import { TbBrandDiscord } from 'react-icons/tb';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Chat: NextPage<{
  page: PageTypes;
}> = ({ page }) => {
  return (
    <>
      <SEOComponent title='THF Radio Chat' />
      {/* <Layout> */}
      <div className='relative'>
        <div className='absolute left-0 w-full bg-orange-500 text-white h-[50px] px-4'>
          <div className='flex space-x-4 items-center h-full'>
            <span className='flex-grow '>THF Radio Chat</span>
            <TbBrandDiscord className='w-6 h-6' />
          </div>
        </div>
        <div className='pt-[6.5rem] h-screen w-[full]'>
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
