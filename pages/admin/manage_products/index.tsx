import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import getStore, {
  getProductList,
  selectSearch,
  setSearch,
  checkLoginStatus,
  selectProductList,
  createProduct,
  AppDispatch,
  selectProductDetail
} from '../../../store'
import AdminProductsScreen from '../../../screens/adminProductsScreen'

function AdminProductsContainer () {
  const dispatch: AppDispatch = useDispatch()
  const search = useSelector(selectSearch)
  const productList = useSelector(selectProductList)
  const newProduct = useSelector(selectProductDetail)
  const createNewProduct = () => dispatch(createProduct())
  const router = useRouter()
  useEffect(() => {
    dispatch(checkLoginStatus())
  })
  useEffect(() => {
    newProduct.product ? router.push(`/admin/manage_products/edit/${newProduct.product._id}`) : console.log('noProduct')
  }, [newProduct.product, router])
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
      <AdminProductsScreen productList={productList} createProduct={createNewProduct} newProduct={newProduct} />
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

export default AdminProductsContainer
