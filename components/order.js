import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
/*
  This example requires Tailwind CSS v2.0+
  This example requires some changes to your config:
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
const paymentMethods = [
  { id: 'PayPal', title: 'PayPal' },
  { id: 'transfer', title: 'Bank Transfer' },
  { id: 'creditCard', title: 'Credit Card' }
]

const shippingMethods = [
  { id: 'standard', title: 'Standard' },
  { id: 'dhl', title: 'DHL' },
  { id: 'dhlExpress', title: 'DHL Express' }
]

export default function Example ({ setName, setAddress, setCity, setCountry, setPostcode, setPhoneNumber, setComment, setPayment, setShippingOption, submitHandler, userOrder }) {
  return (
    <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full flex items-right justify-left py-12 px-16 sm:px-6 lg:px-16">
        <div className="max-w-md w-full space-y-8">
      <form className="mt-8 space-y-6" onSubmit={submitHandler} >
      <label className="text-base font-medium text-gray-900">Shipping Details</label>
      <p className="text-sm leading-5 text-gray-500">Where do you prefer to receiv your order?</p>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className='pt-4 pb-2'>Name</div>
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder={userOrder.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='pt-4 pb-2'>Address</div>
              <div>
                <label htmlFor="address" className="sr-only">
                  address
                </label>
                <input
                  id="address"
                  name="address"
                  type="address"
                  autoComplete="address"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder={userOrder.address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className='pt-4 pb-2'>City</div>
              <div>
                <label htmlFor="City" className="sr-only">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="city"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder={userOrder.city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
                    <div className='pt-4 pb-2'>Country</div>
              <div>
                <label htmlFor="County" className="sr-only">
                  City
                </label>
                <input
                  id="country"
                  name="country"
                  type="country"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder={userOrder.country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
                    <div className='pt-4 pb-2'>Postcode</div>
              <div>
                <label htmlFor="postcode" className="sr-only">
                  City
                </label>
                <input
                  id="postcode"
                  name="postcode"
                  type="postcode"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder={userOrder.postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                />
              </div>
                    <div className='pt-4 pb-2'>Phone number</div>
              <div>
                <label htmlFor="phoneNumber" className="sr-only">
                    phoneNumber
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="phoneNumber"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder={userOrder.phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
                    <div className='pt-4 pb-2'>Aditional comment</div>
              <div>
                <label htmlFor="comment" className="sr-only">
                  City
                </label>
                <input
                  id="comment"
                  name="comment"
                  type="comment"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder={userOrder.comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
            </div>

            <div className="rounded-md shadow-sm -space-y-px">
    <div>
      <label className="text-base font-medium text-gray-900">Payment method</label>
      <p className="text-sm leading-5 text-gray-500">How do you prefer to pay?</p>
      <fieldset className="mt-4 pb-8">
        <legend className="sr-only">Payment method</legend>
        <div className="space-y-4">
          {paymentMethods.map((paymentMethod) => (
            <div key={paymentMethod.id} className="flex items-center">
              <input
                id={paymentMethod.id}
                name="payment-method"
                type="radio"
                onChange={ (e) => setPayment(e.target.id) }
                defaultChecked={paymentMethod.id === 'PayPal'}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label htmlFor={paymentMethod.id} className="ml-3 block text-sm font-medium text-gray-700">
                {paymentMethod.title}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
      </div>


        <div>
      <label className="text-base font-medium text-gray-900 py-8">Shipping Method</label>
      <p className="text-sm leading-5 text-gray-500">Shipping method</p>
      <fieldset className="mt-4">
        <legend className="sr-only">Shipping method</legend>
        <div className="space-y-4">
          {shippingMethods.map((shippingMethod) => (
            <div key={shippingMethod.id} className="flex items-center">
              <input
                id={shippingMethod.id}
                name="shipping-method"
                type="radio"
                onChange={ (e) => setShippingOption(e.target.id) }
                defaultChecked={shippingMethod.id === 'standard'}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label htmlFor={shippingMethod.id} className="ml-3 block text-sm font-medium text-gray-700">
                {shippingMethod.title}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
            </div>

            <div className="flex items-center justify-between">
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update user profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

Example.propTypes = {
  submitHandler: PropTypes.func,
  setName: PropTypes.func,
  setAddress: PropTypes.func,
  setCity: PropTypes.func,
  setCountry: PropTypes.func,
  setPostcode: PropTypes.func,
  setPhoneNumber: PropTypes.func,
  setComment: PropTypes.func,
  setPayment: PropTypes.func,
  setShippingOption: PropTypes.func,
  userOrder: PropTypes.object
}
