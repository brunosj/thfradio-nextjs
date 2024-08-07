import Header from '@/layout/header/Header';
import Footer from '@/layout/footer/Footer';
import LiveTicker from '@/modules/live-ticker/LiveTicker';
import type { Props } from '@/types/PropsInterface';
import MixcloudWidget from '@/modules/mixcloud/MixcloudWidget';
import { useState } from 'react';
import ScrollToTopButton from '../ui/ScrollToTopButton';

export const Layout = ({ children }: Props) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className='relative'>
      <Header isOpen={isMobileMenuOpen} setIsOpen={setMobileMenuOpen} />
      <main
        className={
          isMobileMenuOpen ? 'filter blur-sm duration-700 ease-in-out' : ''
        }
      >
        {/* <LiveTicker /> */}
        <article>{children}</article>
      </main>
      <Footer />
      {/* <MixcloudWidget /> */}
      {/* <ScrollToTopButton /> */}
    </div>
  );
};

export default Layout;
