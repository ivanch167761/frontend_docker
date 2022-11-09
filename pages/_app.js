// pages/_app.js

import Layout from '../components/layout'
import '../styles/globals.css'
import '../styles/styles.css'
import { Provider } from 'react-redux';
import { useStore } from "../store";

export default function MyApp({ Component, pageProps }) {

  const store = useStore(pageProps.initialReduxState);
  return (
  <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider>
  )
}
