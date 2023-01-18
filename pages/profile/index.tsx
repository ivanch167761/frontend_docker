
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import errorMessage from '../../components/errorMessage'
import getStore, {
  checkLoginStatus,
  updateUserProfile,
  selectUserDetail,
  selectError
} from '../../store'

import ProfileScreen from '../../screens/profileScreen'

function ProfileContainer () {
  const [show, setShow] = useState(false)
  const [user, setUser] = useState({ name: 'noData', email: 'noData', password: 'noData' })
  const loginError = useSelector(selectError)
  const userProfile = useSelector(selectUserDetail)
  const router = useRouter()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUserProfile(name, email, password))
  }
  useEffect(() => {
    console.log('set user')
    dispatch(checkLoginStatus())
  }, [])

  useEffect(() => {
    setUser(userProfile)
  }, [userProfile])

  useEffect(() => {
    loginError ? setShow(true) : console.log('')
  }, [loginError])
  return (
      <>
    <ProfileScreen
    userProfile={user}
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

export default ProfileContainer
