
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import errorMessage from '../../components/errorMessage'
import getStore, {
  checkLoginStatus,
  setUserOrder,
  selectError,
  selectMakeOrder,
  AppDispatch
} from '../../store'

import OrderScreen from '../../screens/orderScreen'
type SubmitHandlerType = (e: React.FormEvent<HTMLFormElement>) => void;

function ProfileContainer() {
  const dispatch: AppDispatch = useDispatch()

  const [show, setShow] = useState<boolean>(false)
  const loginError = useSelector(selectError)
  const order = useSelector(selectMakeOrder)
  const [address, setAddress] = useState<string>('')
  const [payment, setPayment] = useState<string>('PayPal')
  const [shippingOption, setShippingOption] = useState<string>('standard')
  const [city, setCity] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [postcode, setPostcode] = useState<number | null>(null)
  const [phoneNumber, setPhoneNumber] = useState<number | null>(null)
  const [comment, setComment] = useState<string>('')
  const [name, setName] = useState<string>('')
  const submitHandler: SubmitHandlerType = (e) => {
    e.preventDefault()
    dispatch(setUserOrder(name, address, city, country, postcode, phoneNumber, comment, payment, shippingOption))
    /* router.push('/') */
  }
  useEffect(() => {
    dispatch(checkLoginStatus())
  })

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

export async function getServerSideProps() {
  const store = getStore()
  return {
    props: {
      initialState: store.getState()
    }
  }
}

export default ProfileContainer
