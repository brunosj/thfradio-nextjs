import Header from '@/layout/header/Header';
import Footer from '@/layout/footer/Footer';
import LiveTicker from '@/modules/live-ticker/LiveTicker';
import { Props } from '@/types/PropsInterface';
import MixcloudWidget from '@/modules/mixcloud/MixcloudWidget';
import { useState } from 'react';

export const Layout = ({ children }: Props) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className='relative'>
      <Header isOpen={isMobileMenuOpen} setIsOpen={setMobileMenuOpen} />
      <main className={isMobileMenuOpen ? 'filter blur-sm' : ''}>
        <LiveTicker />
        <article>{children}</article>
        <MixcloudWidget />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
