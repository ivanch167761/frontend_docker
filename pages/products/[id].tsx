import ProductScreen from '../../screens/productScreen'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import getStore, {
  getProductDetail,
  selectProductDetail,
  selectProductQty,
  setQty,
  addToCart,
  setCart,
  checkLoginStatus,
  AppDispatch

} from '../../store'

import { useRouter } from 'next/router'
function DetailContainer() {
  const dispatch: AppDispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    // Perform localStorage action
    const cartStorage = localStorage.getItem('cartItemsList')
    const setInitialCart = () => dispatch(setCart(cartStorage))
    setInitialCart()
  }, [dispatch])
  const qtyUp = () => dispatch(setQty(qtyProduct + 1))
  const qtyDown = () => dispatch(setQty(qtyProduct - 1))
  const toCart = () => {
    dispatch(addToCart({ product_ID: productData.product._id, qty: qtyProduct }))
    router.push('/cart') 
  }
  const qtyProduct = useSelector(selectProductQty)
  const productData = useSelector(selectProductDetail)
  useEffect(() => {
    dispatch(checkLoginStatus())
  })
  return (
    <ProductScreen
      productDetails={productData}
      qtyUp={qtyUp}
      qtyDown={qtyDown}
      counter={qtyProduct}
      addToCart={toCart}
    />
  )
}

export async function getServerSideProps(context) {
  const { id } = context.query
  const store = getStore()
  await store.dispatch(getProductDetail(id))
  return {
    props: {
      initialState: store.getState()
    }
  }
}

export default DetailContainer
