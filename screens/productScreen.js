import React from 'react'
import Product from '../components/Product/Product'
import PropTypes from 'prop-types'
function ProductScreen (props) {
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
                  productImg={productDetail.productD.image}
                  productText={productDetail.productD.description}
                  productTitle={productDetail.productD.name}
                  productCountInStok={productDetail.productD.countInStock}
                  counter={props.counter}
                  addToCartHandler={props.addToCart}
                  qtyDown={props.qtyDown}
                  qtyUp={props.qtyUp}
                  addToCart={props.addToCart}
                  cart={props.cart}
                />
              </div>
            )}
    </>
  )
}
ProductScreen.propTypes = {
  counter: PropTypes.number.isRequired,
  productDetails: PropTypes.object,
  cart: PropTypes.func,
  addToCart: PropTypes.func,
  qtyUp: PropTypes.func,
  qtyDown: PropTypes.func
}
export default ProductScreen
