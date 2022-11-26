import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetail } from '../actions/productActions'
import listProduct from '../store'
export function GetProductsId () {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  useEffect(() => {
    dispatch(listProduct())
  }, [dispatch])
  return productList.map((product) => {
    return {
      params: {
        id: product._id
      }
    }
  }
  )
}

export function GetProductData (id) {
  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails)

  useEffect(() => {
    dispatch(listProductDetail(id))
  }, [dispatch, id])
  return productDetails
}
