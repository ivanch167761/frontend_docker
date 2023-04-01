import React from 'react'
import EditProduct from '../components/Product/EditProduct'
import { ProductDetailtState } from '../types/storeTypes'

type propsType = {
  productDetails: ProductDetailtState,
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
              <EditProduct
                productBeforeEdit={props.productDetails.product}
              />
            </div>
          )}
    </>
  )
}

export default ProductScreen
