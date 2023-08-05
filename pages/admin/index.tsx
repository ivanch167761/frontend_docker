
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import getStore, {
  checkLoginStatus,
  selectUserDetail,
  AppDispatch
} from '../../store'


function LoginContainer () {
  const user = useSelector(selectUserDetail)
  const router = useRouter()
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(checkLoginStatus())
  }, [dispatch])

  useEffect(() => {
    user ? (user.isAdmin ? router.push('/admin/admin_menu') : router.push('/')) : console.log('no user')
  }, [user, router])
  return (
      <>
      <h1>ADMIN</h1>
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

export default LoginContainer
