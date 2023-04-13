import AdminProductList from '../components/adminProductList'
import React from 'react'
import { ProductDetailtState, ProductListState } from '../types/storeTypes'

type propsType = {
  productList: ProductListState,
  createProduct: () => void,
  newProduct: ProductDetailtState,
}
function AdminProductScreen(props: propsType) {
  return (
    <>
      {
        props.productList.loading
          ? (<h2> loading... </h2>)
          : props.productList.error
            ? (<h3>{props.productList.error}</h3>)
            : (
              <>
                <button
                  onClick={props.createProduct}
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
                  Create New Product
                </button>
                <section className='pt-20 lg:pt-[120px] pb-10 lg:pb-20 bg-[#F3F4F6]'>
                  <div className='container'>

                    <div className='flex flex-wrap -mx-4 max-h-10'>
                      {props.productList.filteredProduct.map((product) => (

                        <AdminProductList
                          key={product._id}
                          product={product}
                        />
                      ))}
                    </div>
                  </div>
                </section>
              </>
            )}
    </>
  )
}
export default AdminProductScreen
