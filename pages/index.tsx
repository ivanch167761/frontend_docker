import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getStore, {
  getProductList,
  selectFilteredProduct,
  selectSearch,
  setSearch,
  checkLoginStatus,
  AppDispatch
} from '../store'

import HomeScreen from '../screens/homeScreen'

function HomeContainer () {
  const dispatch:AppDispatch = useDispatch()
  const search = useSelector(selectSearch)
  const productList = useSelector(selectFilteredProduct)
  useEffect(() => {
    dispatch(checkLoginStatus())
  })
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
