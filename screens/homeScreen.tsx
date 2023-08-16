import Image from 'next/image'
import ProductList from '../components/productList'
import { Product, CategoryDetailtState } from '../types/storeTypes'
import React from 'react'




type propsType = {
  productList: Product[]
  categoryData: CategoryDetailtState
}


function HomeScreen (props: propsType) {
  const productList = props.productList
  return (
    <>
      {
              (
                <>


        <div
          id='viewerBox'
          className='lg:p-10 md:p-6 p-4 bg-gray-100 border-green-400 border dark:bg-gray-900'
        >
          <div className='flex flex-col justify-center lg:space-x-8'>
          <div className='mt-3 md:mt-4 lg:mt-0 flex flex-row  justify-center lg:space-x-8'>
            <div className='w-1/4 lg:w-1/6  bg-gray-50 '>
              <Image
                src={props.categoryData.category.image}
                alt={props.categoryData.category.category}
                priority
                width='100%'
                height='100%'
                layout='responsive'
                objectFit='contain'
              />
            </div>
              <div className='w-3/4'>
              <h1 className='m-2 text-2xl font-semibold text-gray-800 dark:text-white'>
                {props.categoryData.category.category}
              </h1>
              <p className='hidden lg:block md:block leading-normal text-gray-600 dark:text-white mt-2'>
                {props.categoryData.category.description}
              </p>
              </div>
              </div>
              <p className='lg:hidden md:hidden leading-normal text-gray-600 dark:text-white mt-2'>
                {props.categoryData.category.description}
              </p>
          </div>
        </div>






                <section className='pt-20 lg:pt-[120px] pb-10 lg:pb-20 bg-[#F3F4F6]'>
                  <div className='container'>
                    <div className='flex flex-wrap -mx-4 max-h-10'>
                      {productList.map((product: Product) => (
                        <ProductList
                          key={product._id}
                          productListTitle={product.name}
                          productListImg={product.image}
                          productListDesctiption={product.description}
                          productListBtn={product.price + '₽'}
                          productLink={`/products/${product._id}`}
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


export default HomeScreen
