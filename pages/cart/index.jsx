import CartScreen from '../../screens/cartScreen'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import getStore, {
  selectCartProducts,
  selectCartTotalPrice,
  getCartProductsDetail,
  setCart,
  addToCart,
  checkLoginStatus
} from '../../store'

function CartContainer () {
  const dispatch = useDispatch()
  const [changeCart, setChangeCart] = useState({ item: 0, qty: 0 })
  useEffect(() => {
  // Perform localStorage action
    const cartStorage = localStorage.getItem('cartItemsList')
    const cartStorageString = cartStorage ? JSON.parse(cartStorage) : []
    const setCartDetails = async (cartStorage) => await dispatch(getCartProductsDetail(cartStorage))
    const setInitialCart = () => dispatch(setCart(cartStorage))
    setInitialCart()
    setCartDetails(cartStorageString)
    dispatch(addToCart(changeCart))
  }, [dispatch, changeCart])
  useEffect(() => {
    dispatch(checkLoginStatus())
  }, [])

  const cartDataDetails = useSelector(selectCartProducts)
  const cartTotalPrice = useSelector(selectCartTotalPrice)
  return (
     <CartScreen cartData={cartDataDetails} cartPrice={cartTotalPrice} setChangeCart={setChangeCart}/>
  )
}

export async function getServerSideProps () {
  const a = [{ product_ID: 1, qty: 0 }]
  const store = getStore()
  await store.dispatch(getCartProductsDetail(a))
  return {
    props: {
      initialState: store.getState()
    }
  }
}

export default CartContainer
