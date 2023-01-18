import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import getStore, {
  logout,
  selectUserDetail
} from '../../store'

function logoutContainer () {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector(selectUserDetail)
  useEffect(() => {
    dispatch(logout())
  }, [])
  useEffect(() => {
    user ? console.log('usssseeeeeerrrr') : router.push('/')
  }, [user])
}

export async function getServerSideProps () {
  const store = getStore()
  return {
    props: {
      initialState: store.getState()
    }
  }
}

export default logoutContainer
