import Example from '../components/cart_summary';
import React from 'react';
import Link from 'next/link';
import { cartItemDetail, cartItem } from '../types/storeTypes';
import { useRouter } from 'next/router';

type propsType = {
  cartData: cartItemDetail[];
  cartPrice: number;
  setChangeCart: React.Dispatch<React.SetStateAction<cartItem>>;
};

function CartScreen(props: propsType) {
  const router = useRouter();

  return (
    <>
      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-xl">
            <p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
              CART SUMMARY
            </p>
          </div>

          <Example cartData={props.cartData} setChangeCart={props.setChangeCart} />

          <div className="bg-gray-100 my-4 text-3xl text-green-800">
            Total price: {props.cartPrice}
          </div>

          <Link href="/order">
            <button
              type="submit"
              className="w-full py-3 px-6 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Оформить заказ
            </button>
          </Link>

          <button
            onClick={() => {
              router.back();
              router.back();
            }}
            className="mt-3 w-full py-3 px-6 text-sm font-medium rounded-md text-white bg-indigo-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            вернуться назад
          </button>
        </div>
      </div>
    </>
  );
}

export default CartScreen;

