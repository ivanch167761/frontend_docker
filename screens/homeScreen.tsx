import Image from 'next/image'
import { useRouter } from 'next/router'
import ProductList from '../components/productList'
import { ProductListState } from '../types/storeTypes'
import { Product, CategoryDetailtState } from '../types/storeTypes'
import React from 'react'




type propsType = {
  productList: Product[]
  categoryData: CategoryDetailtState
}


function HomeScreen (props: propsType) {
  const router = useRouter()
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
          <div className='mt-3 md:mt-4 lg:mt-0 flex flex-col lg:flex-row items-strech justify-center lg:space-x-8'>
            <div className='lg:w-1/12  bg-gray-50 '>
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
            <div className='lg:w-2/3 flex flex-col justify-center mt-7 md:mt-8 lg:mt-0 pb-8 lg:pb-0'>
              <h1 className='text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white'>
                {props.categoryData.category.category}
              </h1>
              <p className='text-base leading-normal text-gray-600 dark:text-white mt-2'>
                {props.categoryData.category.description}
              </p>
              <div className='pt-10'>
                <button
                  className='w-full lg:w-1/6 border border-gray-800 text-base font-medium leading-none text-gray-800 uppercase py-4 bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-transparent dark:border-white dark:text-white focus:ring-gray-800 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-800 '
                  onClick={() => router.back()}
                >
                  Go Back
                </button>
              </div>
            </div>
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
                          productListBtn={product.price + '$'}
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
