import Link from 'next/dist/client/link'
import { cartItem, cartItemDetail } from '../types/storeTypes'
import Image from 'next/image'

type propsType = {
  cartData: cartItemDetail[],
  setChangeCart: React.Dispatch<React.SetStateAction<cartItem>>
}

export default function Example(props: propsType) {
  const products = props.cartData

  return (
    <div className="mt-10 border-t border-gray-200">
      <h2 className="sr-only">Your order</h2>
      <h3 className="sr-only">Items</h3>
      {products ? (
        products.map((product) => (
          <div key={product._id} className="py-10 border-b border-gray-200 flex space-x-6 items-center">
            <div className="w-20 h-20 sm:w-40 sm:h-40 bg-gray-100 rounded-lg overflow-hidden flex-none">
              <Image
                src={product.image}
                alt={product.name}
                width={product.qty > 1 ? 800 : 100}
                height={product.qty > 1 ? 800 : 100}
                layout="responsive"
                objectFit="cover"
                className="object-center"
              />
            </div>
            <div className="flex-auto flex flex-col">
              <div>
                <h4 className="font-medium text-gray-900">
                  <Link href={'#'}>{product.name}</Link>
                </h4>
                <p className="mt-2 text-sm text-gray-600">{product.description}</p>
              </div>
              <div className="mt-6 flex items-center">
              <div className='flex items-center justify-center mt-4'>
                <button
                  onClick={() => props.setChangeCart({ product_ID: product._id, qty: product.qty>0 ? product.qty - 1 :0})}
                  className='bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-10 w-10 rounded-l cursor-pointer outline-none'
                >
                  -
                </button>
                <span className='text-center pt-2 bg-gray-300 inline-block w-10 h-10 font-semibold text-gray-700'>
                  {product.qty}
                </span>
                <button
                    onClick={() => props.setChangeCart({ product_ID: product._id, qty: product.qty < product.countInStock ? product.qty + 1 : product.countInStock })}
                  className='bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-10 w-10 rounded-r cursor-pointer'
                >
                  +
                </button>
              </div>


                <div className="pl-4">
                  <span className="text-sm text-gray-900 font-medium">Quantity</span>
                </div>
                <div className="pl-6">
                  <span className="text-sm text-gray-900 font-medium">Price</span>
                  <span className="ml-2 text-gray-700">{(product.price * product.qty).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="py-10 text-center text-gray-600">Cart is empty</div>
      )}
    </div>
  )
}

