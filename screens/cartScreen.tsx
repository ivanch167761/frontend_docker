import Example from '../components/cart_summary'
import React from 'react'
import Link from 'next/link'
import { cartItemDetail, cartItem } from '../types/storeTypes'

type propsType = {
  cartData: cartItemDetail[],
  cartPrice: number,
  setChangeCart: React.Dispatch<React.SetStateAction<cartItem>>
}
function CartScreen (props: propsType) {
  return (
    <>
    <div className="bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">CART SUMMARY</p>
        </div>

                        <Example cartData={props.cartData} setChangeCart={props.setChangeCart} />
                        <div>Total price: {props.cartPrice}</div>
            <Link href='/order' className='py-20'>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
               Make your order
              </button>
            </Link>
      </div>
    </div>
    </>
  )
}
export default CartScreen
