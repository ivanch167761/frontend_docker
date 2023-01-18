import CartScreen from '../../screens/cartScreen'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import getStore, {
  selectCart,
  selectCartProducts,
  getCartProductsDetail,
  setCart,
  checkLoginStatus
} from '../../store'

function CartContainer () {
  const dispatch = useDispatch()
  useEffect(() => {
  // Perform localStorage action
    const cartStorage = localStorage.getItem('cartItemsList')
    const cartStorageString = cartStorage ? JSON.parse(cartStorage) : []
    const setCartDetails = async (cartStorage) => await dispatch(getCartProductsDetail(cartStorage))
    const setInitialCart = () => dispatch(setCart(cartStorage))
    setInitialCart()
    setCartDetails(cartStorageString)
  }, [dispatch])
  useEffect(() => {
    dispatch(checkLoginStatus())
  }, [])

  const cartData = useSelector(selectCart)
  const cartDataDetails = useSelector(selectCartProducts)
  const cartDataForShow = cartDataDetails.map((obj1, index) => {
    const obj2 = cartData.filter(obj => obj.product_ID === obj1._id)[0] || {}
    return Object.assign({}, obj1, obj2)
  })
  return (
     <CartScreen cartData={cartDataForShow}/>
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
