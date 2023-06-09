import Header from './header/header';
import Footer from './footer/footer';
import LiveTicker from '../../modules/live-ticker/live-ticker';
import { Props } from '@/types/PropsInterface';
import MixcloudWidget from '@/modules/mixcloud/MixcloudWidget';

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <LiveTicker />
      <main>
        <article>{children}</article>
        <MixcloudWidget />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
