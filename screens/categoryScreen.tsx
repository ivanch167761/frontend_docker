
import CategoryListComp from '../components/categoryList'
import React from 'react'
import { CategoryListState } from '../types/storeTypes'

type propsType = {
  categories: CategoryListState
}

function CategoryScreen(props: propsType) {
  const categories = props.categories
  console.log(categories)
  return (
    <>
      {
        categories.loading
          ? (<h2> loading... </h2>)
          : categories.error
            ? (<h3>{categories.error}</h3>)
            : (
              <section className='pt-20 lg:pt-[120px] pb-10 lg:pb-20 bg-[#F3F4F6]'>
                <div className='container'>
                  <div className='flex flex-wrap -mx-4 max-h-10'>
                    {categories.filteredCategory.map((category) => (
                      <CategoryListComp
                        key={category._id}
                        category={category}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}
    </>
  )
}

export default CategoryScreen
