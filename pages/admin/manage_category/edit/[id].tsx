import EditCategoryScreen from '../../../../screens/editCategoryScreen'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import getStore, {
  getCategoryDetail,
  selectCategoryDetail,
  checkLoginStatus,
  AppDispatch,
  updateCategory,
  uploadCategoryImage,
  deleteCategory

} from '../../../../store'
import { CategoryDetailtState } from '../../../../types/storeTypes'
type submitCangesType = (e: React.FormEvent<HTMLFormElement>) => void;
function DetailContainer() {
  const dispatch: AppDispatch = useDispatch()
  const delCategory = () => {
    dispatch(deleteCategory(categoryData.category._id))
  }
  const categoryData: CategoryDetailtState = useSelector(selectCategoryDetail)
  const [description, setDescription] = useState<string>(categoryData.category.description)
  const [category, setCategory] = useState<string>(categoryData.category.category)

  const submitCanges: submitCangesType = (e) => {
    e.preventDefault()
    dispatch(updateCategory(changingCategoryDetails.category))
    /* router.push('/') */
  }
  useEffect(() => {
    dispatch(checkLoginStatus())
  })
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile: File = e.target.files[0];
    dispatch(uploadCategoryImage({ category: categoryData.category, imageFile: imageFile }));
  }
  const changingCategoryDetails: CategoryDetailtState = {
    category: {
      _id: categoryData.category._id,
      category,
      image: categoryData.category.image,
      description
    },
    error: categoryData.error,
    loading: categoryData.loading
  }
  return (
    <EditCategoryScreen
      categoryDetails={changingCategoryDetails}
      handleChangeCategory={setCategory}
      handleChangeDescription={setDescription}
      handleImageUpload={handleImageUpload}
      delCategory={delCategory}
      submitChanges={submitCanges}
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
