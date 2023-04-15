import Header from 'components/Header';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Weekly recipes</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(h,o,t,j,a,r) {
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:3452206,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');
              r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=')
          `,
          }}
        ></script>
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
