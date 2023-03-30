// components/layout.js
import React from 'react'
import Navbar from './navbar'
import PropTypes from 'prop-types'
export default function Layout ({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.any
}
