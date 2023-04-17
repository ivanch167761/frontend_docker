import Example from '../components/profile'
import React from 'react'
import PropTypes from 'prop-types'
function ProfileScreen (props) {
  return (
    <>
      <Example setName={props.setName} setEmail={props.setEmail} setPassword={props.setPassword} submitHandler={props.submitHandler} userProfile={props.userProfile} />
    </>
  )
}

export default ProfileScreen
ProfileScreen.propTypes = {
  submitHandler: PropTypes.func,
  setEmail: PropTypes.func,
  setName: PropTypes.func,
  setPassword: PropTypes.func,
  userProfile: PropTypes.object
}
