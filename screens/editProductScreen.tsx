import React from 'react'
import { useRouter } from 'next/router'
import EditProduct from '../components/Product/EditProduct'
import { ProductDetailtState } from '../types/storeTypes'

type propsType = {
  productDetails: ProductDetailtState,
  categoryNames: string[],
  handleChangeCountInStock: React.Dispatch<React.SetStateAction<number>>,
  handleChangePrice: React.Dispatch<React.SetStateAction<number>>,
  handleChangeDescription: React.Dispatch<React.SetStateAction<string>>,
  handleChangeName: React.Dispatch<React.SetStateAction<string>>,
  handleImage: React.ChangeEventHandler<HTMLInputElement>,
  handleChangeCategory: React.Dispatch<React.SetStateAction<string>>,
  delProduct: () => void,
  submitChanges: (e: React.FormEvent<HTMLFormElement>) => void
}

function ProductScreen(props: propsType) {
  const router = useRouter()
  return (
    <>
      {props.productDetails.loading
        ? (<h2> loading</h2>)
        : props.productDetails.error
          ? (<h3>error</h3>)
          : (
            <div>
              <button
                onClick={() => {
                  props.delProduct()
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
              <EditProduct
                productBeforeEdit={props.productDetails.product}
                categoryNames={props.categoryNames}
                handleChangeName={props.handleChangeName}
                handleChangeDescription={props.handleChangeDescription}
                handleChangePrice={props.handleChangePrice}
                handleChangeCategory={props.handleChangeCategory}
                handleChangeCountInStock={props.handleChangeCountInStock}
                handleImage={props.handleImage}
                submitChanges={props.submitChanges}
              />
            </div>
          )}
    </>
  )
}

export default ProductScreen
