import Header from "components/Header";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <title>Weekly recipes</title>
      <script type="text/javascript">
        {`var _paq = window._paq = window._paq || [];
        /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
          var u="https://weeklyrecipes.matomo.cloud/";
          _paq.push(['setTrackerUrl', u+'matomo.php']);
          _paq.push(['setSiteId', '1']);
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.async=true; g.src='//cdn.matomo.cloud/weeklyrecipes.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
        })();`}
      </script>
    </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
