import Header from './common/header/header';
import Footer from './common/footer/footer';

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <article>{children}</article>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
