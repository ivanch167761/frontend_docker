import React from 'react'
import { makeOrderItem } from '../types/storeTypes'
type propsType = {
  setName: React.Dispatch<React.SetStateAction<string>>,
  setAddress: React.Dispatch<React.SetStateAction<string>>
  setCity: React.Dispatch<React.SetStateAction<string>>
  setCountry: React.Dispatch<React.SetStateAction<string>>
  setPostcode: React.Dispatch<React.SetStateAction<number | null>>
  setPhoneNumber: React.Dispatch<React.SetStateAction<number | null>>
  setComment: React.Dispatch<React.SetStateAction<string>>
  setShippingOption: React.Dispatch<React.SetStateAction<string>>
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void
  userOrder: makeOrderItem,
  tax: number,
  totalPrice: number,
  shippingPrice: number
}

const shippingMethods = [
  { id: 'standard', title: 'Standard' },
  { id: 'dhl', title: 'DHL' },
  { id: 'dhlExpress', title: 'DHL Express' }
]

export default function Example(props: propsType) {
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
          <form className="mt-8 space-y-6" onSubmit={props.submitHandler} ref={props.ref}>
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
                  placeholder={props.userOrder.name}
                  onChange={(e) => props.setName(e.target.value)}
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
                  placeholder={props.userOrder.address}
                  onChange={(e) => props.setAddress(e.target.value)}
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
                  placeholder={props.userOrder.city}
                  onChange={(e) => props.setCity(e.target.value)}
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
                  placeholder={props.userOrder.country}
                  onChange={(e) => props.setCountry(e.target.value)}
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
                  placeholder={String(props.userOrder.postcode)}
                  onChange={(e) => props.setPostcode(Number(e.target.value))}
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
                  placeholder={String(props.userOrder.phoneNumber)}
                  onChange={(e) => props.setPhoneNumber(Number(e.target.value))}
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
                  placeholder={props.userOrder.comment}
                  onChange={(e) => props.setComment(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
            </div>

            <div className="rounded-md shadow-sm -space-y-px">

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
                          onChange={(e) => props.setShippingOption(e.target.id)}
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
            <div className='border-2 border-blue-500 border-spacing-2 border-dotted'>
              <div className='m-3'>

              цена товара: {props.totalPrice.toFixed()}<br/>
              цена доставки: {props.shippingPrice.toFixed(2)}<br/>
              налог: {((props.totalPrice+props.shippingPrice)*props.tax/100).toFixed(2)}<br/>
              <h3 className='font-bold'>итого: {((props.totalPrice+props.shippingPrice)*
                props.tax/100+props.shippingPrice+
                props.totalPrice).toFixed(2)}</h3>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                перейти к оплате {((props.totalPrice+props.shippingPrice)*
                props.tax/100+props.shippingPrice+
                props.totalPrice).toFixed(2)}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
