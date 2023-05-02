import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getStore, {
  getCategoryList,
  selectCategorySearch,
  checkLoginStatus,
  AppDispatch,
  selectCategoryList,
  setCategorySearch,
  createCategory,
  selectCategoryDetail
} from '../../../store'

import CategoryScreen from '../../../screens/categoryAdminScreen'
import { useRouter } from 'next/router'

function CategoryContainer() {
  const dispatch: AppDispatch = useDispatch()
  const router = useRouter()
  const search = useSelector(selectCategorySearch)
  const newCategoryData = useSelector(selectCategoryDetail)
  const categoryList = useSelector(selectCategoryList)
  const createNewCategory = () => dispatch(createCategory())
  useEffect(() => {
    dispatch(checkLoginStatus())
  }, [dispatch])
  useEffect(() => {
    newCategoryData.category ? router.push(`/admin/manage_category/edit/${newCategoryData.category._id}`) : console.log('noCategory')
  }, [newCategoryData.category, router])
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
      <CategoryScreen categories={categoryList} createNewCategory={createNewCategory} />
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
