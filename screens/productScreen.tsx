import React from 'react'
import Product from '../components/Product/Product'
import { ProductDetailtState } from '../types/storeTypes'

type propsType = {
  productDetails:ProductDetailtState,
  qtyDown: ()=>void,
  qtyUp: ()=>void,
  counter: number,
  addToCart: ()=>void,

}


function ProductScreen (props:propsType) {
  const productDetail = props.productDetails
  return (
    <>
      {productDetail.loading
        ? (<h2> loading</h2>)
        : productDetail.error
          ? (<h3>error</h3>)
          : (
              <div>
                <Product
                  productImg={productDetail.product.image}
                  productText={productDetail.product.description}
                  productTitle={productDetail.product.name}
                  productCountInStok={productDetail.product.countInStock}
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
