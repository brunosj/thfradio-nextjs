import Header from './common/header/header';
import Footer from './common/footer/footer';
import LiveTicker from './modules/live-ticker/live-ticker';

export const Layout = ({ children }) => {
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
