import { AppProps } from 'next/app';
import '../styles/global.css';
import { appWithTranslation } from 'next-i18next';
import { DataProvider } from 'src/context/DataContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DataProvider>
      <Component {...pageProps} />
    </DataProvider>
  );
}

export default appWithTranslation(MyApp);
