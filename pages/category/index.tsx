import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getStore, {
  getCategoryList,
  selectCategorySearch,
  checkLoginStatus,
  AppDispatch,
  selectCategoryList,
  setCategorySearch
} from '../../store'

import CategoryScreen from '../../screens/categoryScreen'

function CategoryContainer() {
  const dispatch: AppDispatch = useDispatch()
  const search = useSelector(selectCategorySearch)
  const categoryList = useSelector(selectCategoryList)
  useEffect(() => {
    dispatch(checkLoginStatus())
  }, [dispatch])
  return (
    <>
      <div className="m-3">
        <input
          type="text"
          onChange={(e) => {
            dispatch(setCategorySearch(e.target.value))
            }}
          value={search}
          name="search"
          id="search"
          className="bg-blue-100 ring-4 ring-pink-200 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm px-4 rounded-full"
        />
      </div>
      <CategoryScreen categories={categoryList} />
    </>
  )
}

export async function getServerSideProps() {
  const store = getStore()
  await store.dispatch(getCategoryList())
  return {
    props: {
      initialState: store.getState()
    }
  }
}

export default CategoryContainer
