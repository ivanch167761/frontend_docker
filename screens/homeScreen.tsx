
import Image from 'next/image'
import { useRouter } from 'next/router'
import ProductList from '../components/productList'
import React from 'react'
import propsTypes from 'prop-types'
function HomeScreen (props) {
  const router = useRouter()
  const productList = props.productList
  return (
    <>
      {
          productList.loading
            ? (<h2> loading... </h2>)
            : productList.error
              ? (<h3>{productList.error}</h3>)
              : (
                <>
      <div className='2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4'>
        <div
          id='viewerBox'
          className='lg:p-10 md:p-6 p-4 bg-gray-100 border-green-400 border dark:bg-gray-900'
        >
          <div className='flex justify-end'>
          </div>
          <div className='mt-3 md:mt-4 lg:mt-0 flex flex-col lg:flex-row items-strech justify-center lg:space-x-8'>
            <div className='lg:w-1/3  bg-gray-50 '>
              <Image
                src={props.categoryData.image}
                alt={props.categoryData.category}
                priority
                width='100%'
                height='100%'
                layout='responsive'
                objectFit='contain'
              />
            </div>
            <div className='lg:w-2/3 flex flex-col justify-center mt-7 md:mt-8 lg:mt-0 pb-8 lg:pb-0'>
              <h1 className='text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white'>
                {props.categoryData.category}
              </h1>
              <p className='text-base leading-normal text-gray-600 dark:text-white mt-2'>
                {props.categoryData.description}
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
      </div>
                <section className='pt-20 lg:pt-[120px] pb-10 lg:pb-20 bg-[#F3F4F6]'>
                  <div className='container'>
                    <div className='flex flex-wrap -mx-4 max-h-10'>
                      {productList.map((product) => (
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

HomeScreen.propTypes = {
  productList: propsTypes.array,
  categoryData: propsTypes.array,
}

export default HomeScreen
