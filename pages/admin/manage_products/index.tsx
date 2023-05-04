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
