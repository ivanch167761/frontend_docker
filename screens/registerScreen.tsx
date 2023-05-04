import Example from '../components/register'
import React from 'react'
import PropTypes from 'prop-types'
function RegisterScreen (props) {
  return (
    <>
      <Example setName={props.setName} setEmail={props.setEmail} setPassword={props.setPassword} setConfirmPassword={props.setConfirmPassword} submitHandler={props.submitHandler}/>
    </>
  )
}

export default RegisterScreen
RegisterScreen.propTypes = {
  submitHandler: PropTypes.func,
  setEmail: PropTypes.func,
  setName: PropTypes.func,
  setPassword: PropTypes.func,
  setConfirmPassword: PropTypes.func,
}
