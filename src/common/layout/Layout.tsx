import Header from '@/layout/header/Header';
import Footer from '@/layout/footer/Footer';
import LiveTicker from '@/modules/live-ticker/LiveTicker';
import { Props } from '@/types/PropsInterface';
import MixcloudWidget from '@/modules/mixcloud/MixcloudWidget';

export const Layout = ({ children }: Props) => {
  return (
    <div className='relative'>
      <Header />
      <LiveTicker />
      <main>
        <article>{children}</article>
        <MixcloudWidget />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
