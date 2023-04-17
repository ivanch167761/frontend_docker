import React, { useEffect } from 'react'
import { orderByIdDetail, shippingAddressType } from '../types/storeTypes'
import Link from 'next/link'
import Image from 'next/image'

type propsType = {
  orderDetail: orderByIdDetail
}
export default function Example(props: propsType) {
  const orderDetails = props.orderDetail
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  function showAddress(addr: shippingAddressType): string {
    if (typeof addr === 'boolean') {
      return 'No address provided'
    }
    return `${addr.address}, ${addr.city}, ${addr.country}, ${addr.postalCode}`
  }
  return (
    <>
      <div className="mt-10 border-t border-gray-200">
        <h2 className="mt-20">Your order</h2>
        <h3 className="mt-20">Items:</h3>
        {orderDetails.orderItems
          ? orderDetails.orderItems.map((product) => (
            <div key={product._id} className="py-10 border-b border-gray-200 flex space-x-6">
              <Image
                src={product.image}
                alt={product.name}
                width={100}
                height={100}
                className="flex-none w-20 h-20 object-center object-cover bg-gray-100 rounded-lg sm:w-40 sm:h-40"
              />
              <div className="flex-auto flex flex-col">
                <div>
                  <h4 className="font-medium text-gray-900">
                    <Link href={'#'}>{product.name}</Link>
                  </h4>
                </div>
                <div className="mt-6 flex-1 flex items-end">
                  <dl className="flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6">
                    <div className="flex">
                      <dt className="font-medium text-gray-900">Quantity</dt>
                      <div className='px-4'>
                        <span className='outline-none text-center bg-gray-300 inline-block w-10 font-semibold hover:text-black items-center text-gray-700'>
                          {product.qty}
                        </span>
                      </div>
                    </div>
                    <div className="pl-4 flex sm:pl-6">
                      <dt className="font-medium text-gray-900">Price</dt>
                      <dd className="ml-2 text-gray-700">{(Number(product.price) * Number(product.qty)).toFixed(2)}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          ))
          : (<div> Cart is empty </div>)
        }

        <h3 className="mt-20">Shipping Price: {orderDetails.shippingPrice} $</h3>
        <h3 className="mt-2">Tax Price: {orderDetails.taxPrice} $</h3>
        <h3 className="mt-2">Total Price: {orderDetails.totalPrice} $</h3>

        <h3 className="mt-20">Shipping Address: {showAddress(orderDetails.shippingAddress)}</h3>
      </div>
    </>
  )
}
