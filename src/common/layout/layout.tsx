import Header from './header/Header';
import Footer from './footer/Footer';
import LiveTicker from '../../modules/live-ticker/LiveTicker';
import { Props } from '@/types/PropsInterface';
import MixcloudWidget from '@/modules/mixcloud/MixcloudWidget';

export const Layout = ({ children }: Props) => {
  return (
    <div className='relative'>
      <Header />
      <div className='sticky top-0  z-50'>
        <LiveTicker />
      </div>
      <main>
        <article>{children}</article>
        <MixcloudWidget />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
