import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '../types/storeTypes'

type propsType = {
  product: Product
}

export const ProductList = (props: propsType) => {
  return (
    <>
      <div className='w-full md:w-1/2 xl:w-1/4 px-4 '>
        <div className='bg-white rounded-lg overflow-hidden mb-10 border border-slate-500'>
          <Image
            src={props.product.image}
            alt='a'
            priority
            width='100%'
            height='100%'
            layout='responsive'
            objectFit='contain'
          />
          <div className='p-8 sm:p-9 md:p-7 xl:p-9 text-center'>
            <h3>
              <Link href={`/admin/manage_products/edit/${props.product._id}`}>
                <a
                  className='
                        font-semibold
                        text-dark text-xl
                        sm:text-[22px]
                        md:text-xl
                        lg:text-[22px]
                        xl:text-xl
                        2xl:text-[22px]
                        mb-4
                        block
                        hover:text-primary
                        '
                >
                  {`${props.product.name} ${props.product.price}$`}
                </a>
              </Link>
            </h3>
            <div>
              <p className='text-base text-body-color leading-relaxed h-48   overflow-clip'>
                {props.product.description}
              </p>
              <Link href={`/admin/manage_products/edit/${props.product._id}`}>
                <a
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
                  EDIT PRODUCT
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default ProductList
