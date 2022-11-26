import Example from '../components/cart_summary.js'
import React from 'react'
import propsTypes from 'prop-types'
function CartScreen ({ cartData }) {
  return (
    <>
    <div className="bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Thank you!</h1>
          <p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">It is on the way!</p>
          <p className="mt-2 text-base text-gray-500">Your order #14034056 has shipped and will be with you soon.</p>

          <dl className="mt-12 text-sm font-medium">
            <dt className="text-gray-900">Tracking number</dt>
            <dd className="text-indigo-600 mt-2">51547878755545848512</dd>
          </dl>
        </div>

                        <Example cartItems={cartData} />
      </div>
    </div>
    </>
  )
}

CartScreen.propTypes = {
  cartData: propsTypes.object

}

export default CartScreen
