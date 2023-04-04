import React from 'react'
import EditProduct from '../components/Product/EditProduct'
import { ProductDetailtState } from '../types/storeTypes'

type propsType = {
  productDetails: ProductDetailtState,
  handleChangeCountInStock: React.Dispatch<React.SetStateAction<number>>,
  handleChangePrice: React.Dispatch<React.SetStateAction<number>>,
  handleChangeDescription: React.Dispatch<React.SetStateAction<string>>,
  handleChangeName: React.Dispatch<React.SetStateAction<string>>,
  handleChangeCategory: React.Dispatch<React.SetStateAction<string>>,
  submitChanges: (e: React.FormEvent<HTMLFormElement>) => void
}

function ProductScreen(props: propsType) {
  return (
    <>
      {props.productDetails.loading
        ? (<h2> loading</h2>)
        : props.productDetails.error
          ? (<h3>error</h3>)
          : (
            <div>
              <EditProduct
                productBeforeEdit={props.productDetails.product}
                handleChangeName={props.handleChangeName}
                handleChangeDescription={props.handleChangeDescription}
                handleChangePrice={props.handleChangePrice}
                handleChangeCategory={props.handleChangeCategory}
                handleChangeCountInStock={props.handleChangeCountInStock}
                submitChanges={props.submitChanges}
              />
            </div>
          )}
    </>
  )
}

export default ProductScreen
