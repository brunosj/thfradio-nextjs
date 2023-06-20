import { AppProps } from 'next/app';
import { PlayerProvider } from '@/context/PlayerContext';
import '../styles/global.css';
import '../modules/carousel/carousel.css';
import { appWithTranslation } from 'next-i18next';
import { DataProvider } from 'src/context/DataContext';
import LiveTicker from '@/modules/live-ticker/LiveTicker';
import MixcloudWidget from '@/modules/mixcloud/MixcloudWidget';
import AudioContextProvider from '@/context/AudioContext';

function THFRadioApp({ Component, pageProps }: AppProps) {
  return (
    <DataProvider>
      <PlayerProvider>
        <AudioContextProvider>
          <LiveTicker />
          <Component {...pageProps} />
          <MixcloudWidget />
        </AudioContextProvider>
      </PlayerProvider>
    </DataProvider>
  );
}

export default appWithTranslation(THFRadioApp);
