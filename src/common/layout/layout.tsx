import Header from './header/header';
import Footer from './footer/footer';
import LiveTicker from '../../modules/live-ticker/live-ticker';
import { Props } from '@/types/PropsInterface';

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <LiveTicker />
      <main>
        <article>{children}</article>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
