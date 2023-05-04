import { FC } from 'react'
import React, { useEffect } from 'react'
import Script from 'next/script'
import Link from 'next/dist/client/link'
/* This example requires Tailwind CSS v2.0+ */
/*  import Image from 'next/image'  */
/*  import Link from 'next/link'  */
import { cartItem, cartItemDetail } from '../types/storeTypes'
import Image from 'next/image'
declare global {
  interface Window { pay: any; }
}
type propsType = {
  cartData: cartItemDetail[],
  setChangeCart: React.Dispatch<React.SetStateAction<cartItem>>
}

interface MyFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  allow?: string;
}


const setPrice = ()=>55.55

export default function Example(props: propsType) {
{/*
  const children = <>
              <input type="hidden" name="terminalkey" value="TinkoffBankTest" />
              <input type="hidden" name="frame" value="true" />
              <input type="hidden" name='amount' value={setPrice()} />
              <input type="hidden" name="language" value="ru" />
              <input type="hidden" name="order" value="79000" />
              <input type="hidden" name="description" value="eee" />
              <input type="hidden" name="name" value="IU" />
              <input type="hidden" name="email" value="iu@iu.es" />
              <input type="hidden" name="phone" value='1654987' />
              <input type="submit" value="Оплатить" />

  </>
    */}
  const products = props.cartData
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js'
    script.async = true
    script.onload = () => {
    }
    document.body.appendChild(script)
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!window.pay) {
      console.log('no pay loaded')
    }
    e.preventDefault(); console.log(e.target); window.pay(e.target) }
/*
function MyForm(props: MyFormProps) {
  return (
    <form {...props}>
      {props.children}
    </form>
  );
}
  */
  return (
    <div className="mt-10 border-t border-gray-200">
      <h2 className="sr-only">Your order</h2>
      <h3 className="sr-only">Items</h3>
      {products
        ? products.map((product) => (
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
                <p className="mt-2 text-sm text-gray-600">{product.description}</p>
              </div>
              <div className="mt-6 flex-1 flex items-end">
                <dl className="flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6">
                  <div className="flex">
                    <dt className="font-medium text-gray-900">Quantity</dt>
                    <div className='px-4'>
                      <button
                        onClick={() => props.setChangeCart({ product_ID: product._id, qty: product.qty + 1 })}
                        className=' bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 rounded-l cursor-pointer outline-none'
                      >
                        +
                      </button>
                      <span className='outline-none text-center bg-gray-300 inline-block w-10 font-semibold hover:text-black items-center text-gray-700'>
                        {product.qty}
                      </span>
                      <button
                        onClick={() => props.setChangeCart({ product_ID: product._id, qty: product.qty - 1 })}
                        className='bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 rounded-r cursor-pointer'
                      >
                        -
                      </button>
                    </div>
                  </div>
                  <div className="pl-4 flex sm:pl-6">
                    <dt className="font-medium text-gray-900">Price</dt>
                    <dd className="ml-2 text-gray-700">{(product.price * product.qty).toFixed(2)}</dd>
                  </div>
                </dl>
              </div>
            </div>
            <Script />
            {/*{MyForm({children:children, allow:"payment", name:"TinkoffPayForm", onSubmit:handleSubmit})}*/}
          </div>
        ))
        : (<div> Cart is empty </div>)
      }

    </div>
  )
}
