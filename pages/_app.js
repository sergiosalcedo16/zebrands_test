import '../styles/globals.css'
import SideNav from '../components/nav'
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const { asPath, pathname } = useRouter();
  return (
    asPath != '/'
    ?
      <SideNav>
        <Component {...pageProps} />
      </SideNav>
    :
      <Component {...pageProps} />
  )
}

export default MyApp
