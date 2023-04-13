import CartScreen from '../../screens/cartScreen'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import getStore, {
  selectCartProducts,
  selectCartTotalPrice,
  getCartProductsDetail,
  setCart,
  addToCart,
  checkLoginStatus,
  AppDispatch
} from '../../store'
import { cartItem } from '../../types/storeTypes'

function CartContainer() {
  const dispatch: AppDispatch = useDispatch()
  const [changeCart, setChangeCart] = useState<cartItem>({ product_ID: 0, qty: 0 })
  useEffect(() => {
    // Perform localStorage action
    const cartStorage = localStorage.getItem('cartItemsList')
    const cartStorageString: cartItem[] = cartStorage ? JSON.parse(cartStorage) : []
    const setCartDetails = async (cartStorage: cartItem[]) => await dispatch(getCartProductsDetail(cartStorage))
    const setInitialCart = () => dispatch(setCart(cartStorage))
    setInitialCart()
    setCartDetails(cartStorageString)
    dispatch(addToCart(changeCart))
  }, [dispatch, changeCart])
  useEffect(() => {
    dispatch(checkLoginStatus())
  })

  const cartDataDetails = useSelector(selectCartProducts)
  const cartTotalPrice = useSelector(selectCartTotalPrice)

  return (
    <CartScreen cartData={cartDataDetails} cartPrice={cartTotalPrice} setChangeCart={setChangeCart} />
  )
}

export async function getServerSideProps() {
  const a = []
  const store = getStore()
  await store.dispatch(getCartProductsDetail(a))
  return {
    props: {
      initialState: store.getState()
    }
  }
}

export default CartContainer
