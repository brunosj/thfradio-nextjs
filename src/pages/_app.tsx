import { AppProps } from 'next/app';
import { PlayerProvider } from '@/context/PlayerContext';
import '../styles/global.css';
import '../modules/carousel/carousel.css';
import { appWithTranslation } from 'next-i18next';
import { DataProvider } from 'src/context/DataContext';
import LiveTicker from '@/modules/live-ticker/LiveTicker';
import MixcloudWidget from '@/modules/mixcloud/MixcloudWidget';

function THFRadioApp({ Component, pageProps }: AppProps) {
  return (
    <DataProvider>
      <PlayerProvider>
        <LiveTicker />
        <Component {...pageProps} />
        <MixcloudWidget />
      </PlayerProvider>
    </DataProvider>
  );
}

export default appWithTranslation(THFRadioApp);
