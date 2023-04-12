import React from 'react'
import { useRouter } from 'next/router'
import EditCategory from '../components/Product/EditCategory'
import { CategoryDetailtState } from '../types/storeTypes'

type propsType = {
  categoryDetails: CategoryDetailtState,
  handleChangeDescription: React.Dispatch<React.SetStateAction<string>>,
  handleChangeCategory: React.Dispatch<React.SetStateAction<string>>,
  delCategory: () => void,
  submitChanges: (e: React.FormEvent<HTMLFormElement>) => void
}

function CategoryScreen(props: propsType) {
  const router = useRouter()
  return (
    <>
      {props.categoryDetails.loading
        ? (<h2> loading</h2>)
        : props.categoryDetails.error
          ? (<h3>error</h3>)
          : (
            <div>
              <button
                onClick={() => {
                  props.delCategory()
                  router.back()

                }
                }
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
                DELETE PRODUCT
              </button>
              <EditCategory
                categoryBeforeEdit={props.categoryDetails.category}
                handleChangeDescription={props.handleChangeDescription}
                handleChangeCategory={props.handleChangeCategory}
                submitChanges={props.submitChanges}
              />
            </div>
          )}
    </>
  )
}

export default CategoryScreen
