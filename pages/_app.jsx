// pages/_app.js
import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import '../styles/globals.css'
import '../styles/styles.css'
import { Provider } from 'react-redux'
import getStore from '../store'

export default function MyApp ({ Component, pageProps }) {
  const store = getStore(pageProps.initialState)
  return (
  <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider>
  )
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object
}
