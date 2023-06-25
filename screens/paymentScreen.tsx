import Example from '../components/payment'
import React from 'react'
type propsType = {
  totalPrice: number,
  setPayment: React.Dispatch<React.SetStateAction<string>>,
}

function PaymentScreen(props: propsType) {
  console.log('in make order')
  return (
    <>
      {
        <Example totalPrice={props.totalPrice} setPayment={props.setPayment}/>
      }
    </>
  )
}

export default PaymentScreen
