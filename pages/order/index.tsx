
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import errorMessage from '../../components/errorMessage'
import getStore, {
  checkLoginStatus,
  setUserOrder,
  selectOrder,
  selectError
} from '../../store'

import OrderScreen from '../../screens/orderScreen'

function ProfileContainer () {
  const [show, setShow] = useState(false)
  const loginError = useSelector(selectError)
  const order = useSelector(selectOrder)
  const router = useRouter()
  const dispatch = useDispatch()
  const [address, setAddress] = useState('')
  const [payment, setPayment] = useState('PayPal')
  const [shippingOption, setShippingOption] = useState('standard')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [postcode, setPostcode] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [comment, setComment] = useState('')
  const [name, setName] = useState('')
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(setUserOrder(name, address, city, country, postcode, phoneNumber, comment, payment, shippingOption) as any)
    /* router.push('/') */
  }
  useEffect(() => {
    console.log('set user')
    dispatch(checkLoginStatus() as any)
  }, [])

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
    setPayment={setPayment}
    setShippingOption={setShippingOption}
    submitHandler={submitHandler} />
    {errorMessage('пользователь с таким адресом электронной почты уже зарегестрирован', show, setShow)}
    </>
  )
}

export async function getServerSideProps () {
  const store = getStore()
  return {
    props: {
      initialState: store.getState()
    }
  }
}

export default ProfileContainer
