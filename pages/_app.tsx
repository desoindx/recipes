import { Header } from 'components/Header'
import Head from 'next/head'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Weekly recipes</title>
    </Head>
    <Header />
    <Component {...pageProps} />
  </>
)

export default MyApp
