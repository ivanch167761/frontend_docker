
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import getStore, {
  login,
  checkLoginStatus,
  selectUserDetail
} from '../../store'

import LoginScreen from '../../screens/loginScreen'

function loginContainer () {
  const user = useSelector(selectUserDetail)
  const router = useRouter()
  const [route, setRoute] = useState()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  useEffect(() => {
    dispatch(checkLoginStatus())
  }, [])

  useEffect(() => {
    user ? router.push('/') : console.log('noUser')
  }, [user])
  return (
      <>
    <LoginScreen
    redirectAfterLogin='/'
    setEmail={setEmail}
    setPassword={setPassword}
    submitHandler={submitHandler} />
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

export default loginContainer
