import { AppProps } from 'next/app';
import '../styles/global.css';
import '../modules/carousel/carousel.css';
import { appWithTranslation } from 'next-i18next';
import { DataProvider } from 'src/context/DataContext';
import { PlayerProvider } from '@/context/PlayerContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DataProvider>
      <PlayerProvider>
        <Component {...pageProps} />
      </PlayerProvider>
    </DataProvider>
  );
}

export default appWithTranslation(MyApp);
