import React from 'react'
import CategoryData from '../components/Product/Category'
import { CategoryDetailtState } from '../types/storeTypes'

type propsType = {
  categoryDetails: CategoryDetailtState
}

function CategoryScreen (props: propsType) {
  const categoryDetail = props.categoryDetails
  return (
    <>
      {categoryDetail.loading
        ? (<h2> loading</h2>)
        : categoryDetail.error
          ? (<h3>error</h3>)
          : (
            <div>
              <CategoryData
                categoryData={categoryDetail.category}
              />
            </div>
            )}
    </>
  )
}

export default CategoryScreen
