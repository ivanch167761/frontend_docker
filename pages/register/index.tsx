
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import errorMessage from '../../components/errorMessage'
import getStore, {
  register,
  checkLoginStatus,
  selectUserDetail,
  selectError
} from '../../store'

import RegisterScreen from '../../screens/registerScreen'

function RegisterContainer () {
  const user = useSelector(selectUserDetail)
  const [show, setShow] = useState(false)
  const loginError = useSelector(selectError)
  const router = useRouter()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(register(name, email, password))
  }
  useEffect(() => {
    dispatch(checkLoginStatus())
  }, [])

  useEffect(() => {
    loginError ? setShow(true) : console.log('NOOOOO')
  }, [loginError])

  useEffect(() => {
    user ? router.push('/') : console.log('noUser')
  }, [user])
  return (
      <>
    <RegisterScreen
    redirectAfterLogin='/'
    setEmail={setEmail}
    setPassword={setPassword}
    setName={setName}
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

export default RegisterContainer
