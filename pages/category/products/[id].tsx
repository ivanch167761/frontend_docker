import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getStore, {
  getCategoryProductList,
  getCategoryDetail,
  selectFilteredProduct,
  selectCategoryDetail,
  selectSearch,
  setSearch,
  checkLoginStatus,
  AppDispatch
} from '../../../store'

import HomeScreen from '../../../screens/homeScreen'

function HomeContainer() {
  const dispatch: AppDispatch = useDispatch()
  const search = useSelector(selectSearch)
  const productList = useSelector(selectFilteredProduct)
  const categoryData = useSelector(selectCategoryDetail)
  useEffect(() => {
    dispatch(checkLoginStatus())
  })
  return (
    <>
      <div className="m-3">
        <input
          type="text"
          onChange={(e) => {
            dispatch(setSearch(e.target.value))
            }}
          value={search}
          name="search"
          id="search"
          className="bg-blue-100 ring-4 ring-pink-200 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm px-4 rounded-full"
        />
      </div>
      <HomeScreen productList={productList} categoryData={categoryData} />
    </>
  )
}

export async function getServerSideProps(context) {
  const store = getStore()
  const { id } = context.query
  await store.dispatch(getCategoryProductList(id))
  await store.dispatch(getCategoryDetail(id))
  return {
    props: {
      initialState: store.getState()
    }
  }
}

export default HomeContainer
