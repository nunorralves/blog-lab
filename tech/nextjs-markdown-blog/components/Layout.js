import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children, title, ...props }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta title={title} />
      </Head>
      <section className='content-wrapper'>
        <Header />
        <div className='content'>{children}</div>
      </section>

      <Footer />
    </>
  );
};

export default Layout;
