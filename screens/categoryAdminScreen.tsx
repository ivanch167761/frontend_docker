
import CategoryListComp from '../components/categoryList'
import React from 'react'
import { CategoryListState } from '../types/storeTypes'
import Link from 'next/link'

type propsType = {
  categories: CategoryListState
  createNewCategory: ()=>void
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
                <button
                  onClick={props.createNewCategory}
                  className='
                     inline-block
                     py-2
                     px-7
                     mt-10
                     border border-[#E5E7EB]
                     rounded-full
                     text-base text-body-color
                     font-medium
                     hover:border-primary hover:bg-primary hover:text-white
                     transition
                     '
                >
                  Create New Category
                </button>
                <div className='container'>
                  <div className='flex flex-wrap -mx-4 max-h-10'>
                    {categories.filteredCategory.map((category) => (
                      <>
                        <CategoryListComp
                          key={category._id}
                          category={category}
                        />
                        <p>
                          <Link href={`/admin/manage_category/edit/${category._id}`}>
                            <button
                              className='
                    inline-block
                    py-2
                    px-7
                    mt-10
                    border border-[#E5E7EB]
                    rounded-full
                    text-base text-body-color
                    font-medium
                    hover:border-primary hover:bg-primary hover:text-white
                    transition
                    '
                            >
                              EDIT category
                            </button>
                          </Link>
                        </p>
                      </>
                    ))}
                  </div>
                </div>
              </section>
            )}
    </>
  )
}

export default CategoryScreen
