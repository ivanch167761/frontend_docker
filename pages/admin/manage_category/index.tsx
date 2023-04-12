import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getStore, {
  getCategoryList,
  selectCategorySearch,
  checkLoginStatus,
  AppDispatch,
  selectCategoryList,
  setCategorySearch
} from '../../../store'

import CategoryScreen from '../../../screens/categoryAdminScreen'

function categoryContainer() {
  const dispatch: AppDispatch = useDispatch()
  const search = useSelector(selectCategorySearch)
  const categoryList = useSelector(selectCategoryList)
  useEffect(() => {
    dispatch(checkLoginStatus())
  }, [])
  return (
    <>
      <div>
        <input
          type='text'
          value={search}
          onChange={(e) => {
            { dispatch(setCategorySearch(e.target.value)) }
          }}
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

export default categoryContainer
