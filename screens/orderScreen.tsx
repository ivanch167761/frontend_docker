import Example from '../components/order.js'
import React from 'react'
import PropTypes from 'prop-types'
function OrderScreen (props) {
  return (
    <>
      <Example setName={props.setName} setAddress={props.setAddress} setCity={props.setCity} setCountry={props.setCountry} setPostcode={props.setPostcode} setPhoneNumber={props.setPhoneNumber} setComment={props.setComment} setPayment={props.setPayment} setShippingOption={props.setShippingOption} submitHandler={props.submitHandler} userOrder={props.userOrder} />
    </>
  )
}

export default OrderScreen
OrderScreen.propTypes = {
  submitHandler: PropTypes.func,
  setAddress: PropTypes.func,
  setCity: PropTypes.func,
  setCountry: PropTypes.func,
  setName: PropTypes.func,
  setPostcode: PropTypes.func,
  setPhoneNumber: PropTypes.func,
  setComment: PropTypes.func,
  setPayment: PropTypes.func,
  setShippingOption: PropTypes.func,
  userOrder: PropTypes.object
}
