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
  deleteProduct,
  getCategoryList,
  selectCategoryList,
  uploadSecondImage,
  uploadThirdImage
} from '../../../../store'
import { CategoryListState, ProductDetailtState } from '../../../../types/storeTypes'
type submitCangesType = (e: React.FormEvent<HTMLFormElement>) => void;
function DetailContainer() {
  const dispatch: AppDispatch = useDispatch()
  const delProduct = () => {
    dispatch(deleteProduct(productData.product._id))
    console.log('HHHHHH')
  }

  const productData: ProductDetailtState = useSelector(selectProductDetail)
  const categoryListData: CategoryListState = useSelector(selectCategoryList)
  const [price, setPrice] = useState<number>(productData.product.price)
  const [category_, setCategory] = useState<string>(productData.product.category)
  const [countInStock_, setCountInStock] = useState<number>(productData.product.countInStock)
  const [name_, setName] = useState<string>(productData.product.name)
  const [description_, setDescription] = useState<string>(productData.product.description)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile: File = e.target.files[0];
    dispatch(uploadImage({ product: productData.product, imageFile: imageFile }));
  }
  const handleSecondImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile: File = e.target.files[0];
    dispatch(uploadSecondImage({ product: productData.product, imageFile: imageFile }));
  }
  const handleThirdImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile: File = e.target.files[0];
    dispatch(uploadThirdImage({ product: productData.product, imageFile: imageFile }));
  }
  const categoryNames = categoryListData.categoryList.map((category) => category.category)
  console.log(categoryNames)
  const changingProductDetails: ProductDetailtState = {
    product: {
      _id: productData.product._id,
      category: category_,
      user: productData.product.user,
      name: name_,
      image: productData.product.image,
      brand: productData.product.brand,
      description: description_,
      price: price,
      countInStock: countInStock_,
      createdAt: productData.product.createdAt
    },
    available: productData.available,
    error: productData.error,
    loading: productData.loading,
    qty: productData.qty
  }
  const submitCanges: submitCangesType = (e) => {
    e.preventDefault()
    dispatch(updateProduct(changingProductDetails.product))
    /* router.push('/') */
  }
  useEffect(() => {
    dispatch(checkLoginStatus())
  }, [dispatch])
  return (
    <EditProductScreen
      productDetails={changingProductDetails}
      categoryNames={categoryNames}
      handleChangePrice={setPrice}
      handleChangeCategory={setCategory}
      handleChangeCountInStock={setCountInStock}
      handleChangeDescription={setDescription}
      handleChangeName={setName}
      handleImage={handleImageUpload}
      handleSecondImage={handleSecondImageUpload}
      handleThirdImage={handleThirdImageUpload}
      delProduct={delProduct}
      submitChanges={submitCanges}
    />
  )
}

export async function getServerSideProps(context) {
  const { id } = context.query
  const store = getStore()
  await store.dispatch(getProductDetail(id))
  await store.dispatch(getCategoryList())
  return {
    props: {
      initialState: store.getState()
    }
  }
}

export default DetailContainer
