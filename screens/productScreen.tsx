import React from 'react'
import ProductComponent from '../components/Product/Product'
import { ProductDetailtState } from '../types/storeTypes'

type propsType = {
  productDetails: ProductDetailtState,
  qtyDown: () => void,
  qtyUp: () => void,
  counter: number,
  addToCart: () => void,

}

function ProductScreen(props: propsType) {
  return (
    <>
      {props.productDetails.loading
        ? (<h2> loading</h2>)
        : props.productDetails.error
          ? (<h3>error</h3>)
          : (
            <div>
              <ProductComponent
                product={props.productDetails.product}
                counter={props.counter}
                addToCartHandler={props.addToCart}
                qtyDown={props.qtyDown}
                qtyUp={props.qtyUp}
              />
            </div>
          )}
    </>
  )
}

export default ProductScreen
