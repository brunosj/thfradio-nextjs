import { AppProps } from 'next/app';
import '../styles/global.css';
import '../modules/carousel/carousel.css';
import { appWithTranslation } from 'next-i18next';
import { DataProvider } from 'src/context/DataContext';
import Header from '@/layout/header/Header';
import Footer from '@/layout/footer/Footer';
import LiveTicker from '@/modules/live-ticker/LiveTicker';
import MixcloudWidget from '@/modules/mixcloud/MixcloudWidget';
import ScrollToTopButton from '@/ui/ScrollToTopButton';
import { useState } from 'react';

function THFRadioApp({ Component, pageProps }: AppProps) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <DataProvider>
      <Header isOpen={isMobileMenuOpen} setIsOpen={setMobileMenuOpen} />
      <main className={isMobileMenuOpen ? 'filter blur-sm' : ''}>
        <LiveTicker />
        <article>
          <Component {...pageProps} />
        </article>
        <MixcloudWidget />
      </main>
      <Footer />
      <ScrollToTopButton />
    </DataProvider>
  );
}

export default appWithTranslation(THFRadioApp);
