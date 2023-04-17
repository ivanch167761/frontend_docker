import EditProductScreen from '../../../../screens/editProductScreen'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import getStore, {
  getProductDetail,
  selectProductDetail,
  checkLoginStatus,
  AppDispatch,
  updateProduct,
  uploadImage,
  deleteProduct
} from '../../../../store'
import { ProductDetailtState } from '../../../../types/storeTypes'
type submitCangesType = (e: React.FormEvent<HTMLFormElement>) => void;
function DetailContainer () {
  const dispatch: AppDispatch = useDispatch()
  const delProduct = () => {
    dispatch(deleteProduct(productData.product._id))
    console.log('HHHHHH')
  }
  

  const productData: ProductDetailtState = useSelector(selectProductDetail)
  const [show, setShow] = useState<boolean>(false)
  const [price, setPrice] = useState<number>(productData.product.price)
  const [category, setCategory] = useState<string>(productData.product.category)
  const [countInStock, setCountInStock] = useState<number>(productData.product.countInStock)
  const [name, setName] = useState<string>(productData.product.name)
  const [descriptoin, setDescription] = useState<string>(productData.product.description)
  const pproduct = productData.product
  const handleImageUpload = (e) => {
    const imageFile:File = e.target.files[0];
    console.log(imageFile)
    console.log(pproduct._id)
    dispatch(uploadImage({product: pproduct, imageFile: imageFile}));
  }
  const submitCanges: submitCangesType = (e) => {
    e.preventDefault()
    dispatch(updateProduct(changingProductDetails.product))
    /* router.push('/') */
  }
  useEffect(() => {
    dispatch(checkLoginStatus())
  })
  const changingProductDetails: ProductDetailtState = {
    product: {
      _id: productData.product._id,
      category,
      user: productData.product.user,
      name,
      image: productData.product.image,
      brand: productData.product.brand,
      description: descriptoin,
      price,
      countInStock,
      createdAt: productData.product.createdAt
    },
    available: productData.available,
    error: productData.error,
    loading: productData.loading,
    qty: productData.qty
  }
  return (
    <EditProductScreen
      productDetails={changingProductDetails}
      handleChangePrice={setPrice}
      handleChangeCategory={setCategory}
      handleChangeCountInStock={setCountInStock}
      handleChangeDescription={setDescription}
      handleChangeName={setName}
      handleImage={handleImageUpload}
      delProduct={delProduct}
      submitChanges={submitCanges}
    />
  )
}

export async function getServerSideProps (context) {
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
