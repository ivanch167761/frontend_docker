import CategoryListComp from '../components/categoryList'
import React from 'react'
import { CategoryListState } from '../types/storeTypes'

type propsType = {
  categories: CategoryListState
}

function CategoryScreen(props: propsType) {
  const categories = props.categories

  return (
    <>
      {
        categories.loading
          ? (<h2>loading...</h2>)
          : categories.error
            ? (<h3>{categories.error}</h3>)
            : (
              <section className='pt-20 lg:pt-[120px] pb-10 lg:pb-20 bg-[#F3F4F6]'>
                <div className='container mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                  {categories.filteredCategory.map((category) => (
                    category._id !== 1 ?(
                    <div key={category._id} className='p-4'>
                      <CategoryListComp
                        category={category}
                      />
                    </div>
                  ):null))}
                </div>
              </section>
            )}
    </>
  )
}

export default CategoryScreen

