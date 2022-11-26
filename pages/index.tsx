import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getStore, {
  getProductList,
  selectFilteredProduct,
  selectSearch,
  setSearch
} from '../store'

import HomeScreen from '../screens/homeScreen'

function HomeContainer () {
  const dispatch = useDispatch()
  const search = useSelector(selectSearch)
  const productList = useSelector(selectFilteredProduct)
  const host = process.env.BACKEND_HOST
  console.log('host:')
  console.log(host)
  return (
      <>
      <div>
        <input
          type='text'
          value={search}
          onChange={(e) => {
            dispatch(setSearch(e.target.value))
          }}
        />
      </div>
    <HomeScreen productList={productList} />
    </>
  )
}

export async function getServerSideProps () {
  const store = getStore()
  await store.dispatch(getProductList())
  return {
    props: {
      initialState: store.getState()
    }
  }
}

export default HomeContainer
