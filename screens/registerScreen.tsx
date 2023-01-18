import Example from '../components/register.js'
import React from 'react'
import PropTypes from 'prop-types'
function RegisterScreen (props) {
  return (
    <>
      <Example setName={props.setName} setEmail={props.setEmail} setPassword={props.setPassword} submitHandler={props.submitHandler} redirectAfterLogin={'/'} />
    </>
  )
}

export default RegisterScreen
RegisterScreen.propTypes = {
  submitHandler: PropTypes.func,
  setEmail: PropTypes.func,
  setName: PropTypes.func,
  setPassword: PropTypes.func,
  redirectAfterLogin: PropTypes.string
}
