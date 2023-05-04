
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import errorMessage from '../../components/errorMessage'
import getStore, {
  register,
  checkLoginStatus,
  selectUserDetail,
  selectError,
  selectLoading,
  AppDispatch
} from '../../store'

import RegisterScreen from '../../screens/registerScreen'

function RegisterContainer() {
  const user = useSelector(selectUserDetail)
  const [show, setShow] = useState(false)
  const [show_pass_err, setShow_pass_err] = useState(false)
  const loginError = useSelector(selectError)
  const loginLoading = useSelector(selectLoading)
  const router = useRouter()
  const dispatch: AppDispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [passErrMessage, setPassErrMessage] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const submitHandler = (e) => {
    if ((password === confirmPassword) && (password.length>=8))  {
      e.preventDefault()
      console.log('todo ok')
      dispatch(register(name, email, password))
  } else if (password !==confirmPassword){
      setPassErrMessage('Пароли не совпадают.')
      e.preventDefault()
      console.log('todo ko')
      setShow_pass_err(true)
    } else if (password.length < 8){
      setPassErrMessage('Пароль должен быть 8 символов или более.')
      e.preventDefault()
      console.log('todo ko')
      setShow_pass_err(true)
    } 
  }
  useEffect(() => {
    dispatch(checkLoginStatus())
  }, [dispatch])

  useEffect(() => {
    loginError ? setShow(true) : null
  }, [loginError])

  useEffect(() => {
    password !== confirmPassword && loginLoading? setShow_pass_err(true) : null
  }, [password, confirmPassword, loginLoading])

  useEffect(() => {
    user ? router.push('/') : console.log('noUser')
  }, [user, router])
  return (
    <>
      <RegisterScreen
        setEmail={setEmail}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        setName={setName}
        submitHandler={submitHandler} />
      {errorMessage('пользователь с таким адресом электронной почты уже зарегестрирован', show, setShow)}
      {errorMessage(passErrMessage, show_pass_err, setShow_pass_err)}
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

export default RegisterContainer
