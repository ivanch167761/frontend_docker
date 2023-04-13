import Example from '../components/login'
import React from 'react'
function loginScreen (props) {
  return (
    <>
      <Example setEmail={props.setEmail} setPassword={props.setPassword} submitHandler={props.submitHandler} redirectAfterLogin={'/'}/>
    </>
  )
}

export default loginScreen
