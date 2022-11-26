import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

export const Product = ({ productImg, productImgAlt, productTitle, productText, productCountInStok, counter, addToCartHandler, qtyUp, qtyDown }) => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <div className='2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4'>
        <div
          id='viewerBox'
          className='lg:p-10 md:p-6 p-4 bg-gray-100 border-green-400 border dark:bg-gray-900'
        >
          <div className='flex justify-end'>
            <button
              aria-label='Close'
              className='focus:outline-none focus:ring-2 focus:ring-gray-800'
              onClick={() => router.back()}
            >
              <svg
                className='dark:text-white'
                width='32'
                height='32'
                viewBox='0 0 32 32'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M17.8799 15.9996L23.6133 10.2796C23.8643 10.0285 24.0054 9.688 24.0054 9.33293C24.0054 8.97786 23.8643 8.63733 23.6133 8.38626C23.3622 8.13519 23.0217 7.99414 22.6666 7.99414C22.3115 7.99414 21.971 8.13519 21.7199 8.38626L15.9999 14.1196L10.2799 8.38626C10.0288 8.13519 9.68832 7.99414 9.33325 7.99414C8.97818 7.99414 8.63766 8.13519 8.38659 8.38626C8.13551 8.63733 7.99446 8.97786 7.99446 9.33293C7.99446 9.688 8.13551 10.0285 8.38659 10.2796L14.1199 15.9996L8.38659 21.7196C8.26161 21.8435 8.16242 21.991 8.09473 22.1535C8.02704 22.316 7.99219 22.4902 7.99219 22.6663C7.99219 22.8423 8.02704 23.0166 8.09473 23.179C8.16242 23.3415 8.26161 23.489 8.38659 23.6129C8.51054 23.7379 8.658 23.8371 8.82048 23.9048C8.98296 23.9725 9.15724 24.0073 9.33325 24.0073C9.50927 24.0073 9.68354 23.9725 9.84602 23.9048C10.0085 23.8371 10.156 23.7379 10.2799 23.6129L15.9999 17.8796L21.7199 23.6129C21.8439 23.7379 21.9913 23.8371 22.1538 23.9048C22.3163 23.9725 22.4906 24.0073 22.6666 24.0073C22.8426 24.0073 23.0169 23.9725 23.1794 23.9048C23.3418 23.8371 23.4893 23.7379 23.6133 23.6129C23.7382 23.489 23.8374 23.3415 23.9051 23.179C23.9728 23.0166 24.0077 22.8423 24.0077 22.6663C24.0077 22.4902 23.9728 22.316 23.9051 22.1535C23.8374 21.991 23.7382 21.8435 23.6133 21.7196L17.8799 15.9996Z'
                  fill='#1F2937'
                />
              </svg>
            </button>
          </div>
          <div className='mt-3 md:mt-4 lg:mt-0 flex flex-col lg:flex-row items-strech justify-center lg:space-x-8'>
            <div className='lg:w-1/3  bg-gray-50 '>
              <Image
                src={productImg}
                alt={productImgAlt}
                priority
                width='100%'
                height='100%'
                layout='responsive'
                objectFit='contain'
              />
            </div>
            <div className='lg:w-2/3 flex flex-col justify-center mt-7 md:mt-8 lg:mt-0 pb-8 lg:pb-0'>
              <h1 className='text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white'>
                {productTitle}
              </h1>
              <p className='text-base leading-normal text-gray-600 dark:text-white mt-2'>
                {productText}
              </p>
              <div className='flex items-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mt-20 md:mt-15'>
                <div className='lg:w-1/6 py-4'>
                  <button
                    onClick={qtyUp}
                    className=' bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 rounded-l cursor-pointer outline-none'
                  >
                    +
                  </button>
                  <span className='outline-none text-center bg-gray-300 inline-block w-10 font-semibold hover:text-black items-center text-gray-700'>
                    {counter}
                  </span>
                  <button
                    onClick={qtyDown}
                    className='bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 rounded-r cursor-pointer'
                  >
                    -
                  </button>
                </div>
                <Link href={'/cart'} className='w-full'>
                  <button
                    onClick={addToCartHandler}
                    className={
                      productCountInStok === 0
                        ? 'w-full lg:w-1/6 border border-gray-800 text-base font-medium leading-none text-white uppercase py-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-gray-100 text-black dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200'
                        : 'w-full lg:w-1/6 border border-gray-800 text-base font-medium leading-none text-white uppercase py-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-gray-800 text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200'
                    }
                  >
                    {productCountInStok > 0 ? 'Add To Cart' : 'OUT OF STOCK'}
                  </button>
                </Link>
                <button className='w-full lg:w-1/6 border border-gray-800 text-base font-medium leading-none text-gray-800 dark:text-white uppercase py-4 bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-transparent dark:border-white dark:text-white focus:ring-gray-800 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-800 '>
                  View Details
                </button>
              </div>
              <div className='mt-6'>
                <button className='text-xl underline text-gray-800 dark:text-white dark:hover:text-gray-200 capitalize hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800'>
                  add to wishlist
                </button>
              </div>
              <div className='pt-10'>
                <button
                  className='w-full lg:w-1/6 border border-gray-800 text-base font-medium leading-none text-gray-800 dark:text-white uppercase py-4 bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-transparent dark:border-white dark:text-white focus:ring-gray-800 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-800 '
                  onClick={() => router.back()}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Product.propTypes = {
  productImg: PropTypes.string,
  productImgAlt: PropTypes.string,
  productTitle: PropTypes.string,
  productText: PropTypes.string,
  productCountInStok: PropTypes.number,
  counter: PropTypes.number,
  addToCartHandler: PropTypes.func,
  qtyUp: PropTypes.func,
  qtyDown: PropTypes.func
}
export default Product
