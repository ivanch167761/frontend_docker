import EditProductScreen from '../../../../screens/editProductScreen'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import getStore, {
  getProductDetail,
  selectProductDetail,
  checkLoginStatus,
  AppDispatch

} from '../../../../store'

function DetailContainer() {
  const dispatch: AppDispatch = useDispatch();
  const productData = useSelector(selectProductDetail)
  useEffect(() => {
    dispatch(checkLoginStatus())
  }, [])
  return (
    <EditProductScreen
      productDetails={productData}
    />
  )
}

export async function getServerSideProps(context) {
  const { id } = context.query
  const store = getStore()
  await store.dispatch(getProductDetail(id))
  return {
    props: {
      initialState: store.getState()
    }
  }
}

export default DetailContainer
