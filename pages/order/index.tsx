import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import errorMessage from '../../components/errorMessage'
import getStore, {
  checkLoginStatus,
  setUserOrder,
  selectError,
  selectUserDetail,
  selectOrderDetail,
  selectMakeOrder,
  getCartProductsDetail,
  setCart,
  selectCartTotalPrice,
  AppDispatch,
} from '../../store'
import { cartItem } from '../../types/storeTypes'
import OrderScreen from '../../screens/orderScreen'

function ProfileContainer() {
  const loginError = useSelector(selectError)
  const user = useSelector(selectUserDetail)
  const order = useSelector(selectMakeOrder)
  const order_id = useSelector(selectOrderDetail)
  const cartTotalPrice = useSelector(selectCartTotalPrice)
  const tax = 25
  const dispatch: AppDispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    // Perform localStorage action
    const cartStorage = localStorage.getItem('cartItemsList')
    const cartStorageString: cartItem[] = cartStorage ? JSON.parse(cartStorage) : []
    const setCartDetails = async (cartStorage: cartItem[]) => await dispatch(getCartProductsDetail(cartStorage))
    const setInitialCart = () => dispatch(setCart(cartStorage))
    setInitialCart()
    setCartDetails(cartStorageString)
  }, [dispatch])

  useEffect(() => {
    dispatch(checkLoginStatus())
  }, [dispatch])
  useEffect(()=>{
    cartTotalPrice > 0 ? (user ? console.log('aaaaa', user) : router.push('/login')) : console.log('loading')
    if (order_id._id > 0){
    router.push(`/payment/${order_id._id}`)} else {
    }
      }), [order_id, user, cartTotalPrice]
  // useState
  const [show, setShow] = useState<boolean>(false)
  const [address, setAddress] = useState<string>('')
  const [shippingOption, setShippingOption] = useState<string>('standard')
  const [city, setCity] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [postcode, setPostcode] = useState<number | null>(null)
  const [phoneNumber, setPhoneNumber] = useState<number | null>(null)
  const [comment, setComment] = useState<string>('')
  const [name, setName] = useState<string>('')

  const shippingPrice = useCallback(() => {
    switch (shippingOption){
      case 'dhl':
        return 250
      case 'dhlExpress':
        return 500
      default:
        return 0
      }
  },[shippingOption])



  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(setUserOrder(name, address, city, country, postcode, phoneNumber, comment, 'PayPal', shippingOption))
  }

  useEffect(() => {
    loginError ? setShow(true) : console.log('')
  }, [loginError])
  


  return (
    <>
      <OrderScreen
        userOrder={order}
        setName={setName}
        setAddress={setAddress}
        setCity={setCity}
        setCountry={setCountry}
        setPostcode={setPostcode}
        setPhoneNumber={setPhoneNumber}
        setComment={setComment}
        setShippingOption={setShippingOption}
        submitHandler={submitHandler}
        shippingPrice={shippingPrice()}
        totalPrice={cartTotalPrice}
        tax={tax}
        />
      {errorMessage('пользователь с таким адресом электронной почты уже зарегестрирован', show, setShow)}
    </>
  )
}

export async function getServerSideProps() {
  const store = getStore()
  return {
    props: {
      initialState: store.getState()
    }
  }
}

export default ProfileContainer
