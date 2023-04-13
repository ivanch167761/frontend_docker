import Example from '../components/order'
import React from 'react'
import { makeOrderItem } from '../types/storeTypes.jsx'
type propsType = {
  setName: React.Dispatch<React.SetStateAction<string>>,
  setAddress: React.Dispatch<React.SetStateAction<string>>
  setCity: React.Dispatch<React.SetStateAction<string>>
  setCountry: React.Dispatch<React.SetStateAction<string>>
  setPostcode: React.Dispatch<React.SetStateAction<number | null>>
  setPhoneNumber: React.Dispatch<React.SetStateAction<number | null>>
  setComment: React.Dispatch<React.SetStateAction<string>>
  setShippingOption: React.Dispatch<React.SetStateAction<string>>
  setPayment: React.Dispatch<React.SetStateAction<string>>
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void
  userOrder: makeOrderItem
}

function OrderScreen(props: propsType) {
  console.log('in make order')
  console.log(props.userOrder)
  return (
    <>
      {
        <Example setName={props.setName} setAddress={props.setAddress} setCity={props.setCity} setCountry={props.setCountry} setPostcode={props.setPostcode} setPhoneNumber={props.setPhoneNumber} setComment={props.setComment} setPayment={props.setPayment} setShippingOption={props.setShippingOption} submitHandler={props.submitHandler} userOrder={props.userOrder} />
      }
    </>
  )
}

export default OrderScreen
