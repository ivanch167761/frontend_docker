import ProductScreen from '../../../screens/categoryDetailScreen'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import getStore, {
  getCategoryDetail,
  selectCategoryDetail,
  checkLoginStatus,
  AppDispatch

} from '../../../store'

function DetailContainer() {
  const dispatch: AppDispatch = useDispatch();
  const categoryData = useSelector(selectCategoryDetail)
  useEffect(() => {
    dispatch(checkLoginStatus())
  }, [])
  console.log(categoryData)
  return (
    <ProductScreen
      categoryDetails={categoryData}
    />
  )
}

export async function getServerSideProps(context) {
  const { id } = context.query
  const store = getStore()
  await store.dispatch(getCategoryDetail(id))
  return {
    props: {
      initialState: store.getState()
    }
  }
}

export default DetailContainer
