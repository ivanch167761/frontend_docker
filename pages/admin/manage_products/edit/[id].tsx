import EditProductScreen from '../../../../screens/editProductScreen'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import getStore, {
  getProductDetail,
  selectProductDetail,
  checkLoginStatus,
  AppDispatch,
  updateProduct,

} from '../../../../store'
import { ProductDetailtState } from '../../../../types/storeTypes';

type submitCangesType = (e: React.FormEvent<HTMLFormElement>) => void;
function DetailContainer() {
  const dispatch: AppDispatch = useDispatch();
  const productData: ProductDetailtState = useSelector(selectProductDetail)
  const [show, setShow] = useState<boolean>(false)
  const [price, setPrice] = useState<number>(productData.product.price)
  const [category, setCategory] = useState<string>(productData.product.category)
  const [countInStock, setCountInStock] = useState<number>(productData.product.countInStock)
  const [name, setName] = useState<string>(productData.product.name)
  const [descriptoin, setDescription] = useState<string>(productData.product.description)

  const submitCanges: submitCangesType = (e) => {
    e.preventDefault()
    dispatch(updateProduct(changingProductDetails.product))
    /* router.push('/') */
  }
  useEffect(() => {
    dispatch(checkLoginStatus())
  }, [])
  const changingProductDetails: ProductDetailtState = {
    product: {
      _id: productData.product._id,
      category: category,
      user: productData.product.user,
      name: name,
      image: productData.product.image,
      brand: productData.product.brand,
      description: descriptoin,
      price: price,
      countInStock: countInStock,
      createdAt: productData.product.createdAt,
    },
    available: productData.available,
    error: productData.error,
    loading: productData.loading,
    qty: productData.qty,
  };
  return (
    <EditProductScreen
      productDetails={changingProductDetails}
      handleChangePrice={setPrice}
      handleChangeCategory={setCategory}
      handleChangeCountInStock={setCountInStock}
      handleChangeDescription={setDescription}
      handleChangeName={setName}
      submitChanges={submitCanges}
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
