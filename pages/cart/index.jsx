import CartScreen from '../../screens/cartScreen'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import getStore, {
  selectCart,
  setCart
} from '../../store'

function CartContainer () {
  const dispatch = useDispatch()
  useEffect(() => {
  // Perform localStorage action
    const cartStorage = localStorage.getItem('cartItemsList')
    const setInitialCart = () => dispatch(setCart(cartStorage))
    setInitialCart()
  }, [dispatch])
  const cartData = useSelector(selectCart)
  console.log(cartData)
  return (
     <CartScreen cartData={cartData}/>
  )
}

export async function getServerSideProps () {
  const store = getStore()
  await store.dispatch(setCart())
  return {
    props: {
      initialState: store.getState()
    }
  }
}

export default CartContainer
