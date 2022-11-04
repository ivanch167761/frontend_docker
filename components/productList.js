import React from "react";
import Image from 'next/image'
import Link from 'next/link'

export const ProductList = ({
  productListTitle,
  productListDesctiption,
  productListBtn,
  productListImg,
  productLink,
}) => {
  return (
    <>
      <div className="w-full md:w-1/2 xl:w-1/4 px-4 ">
        <div className="bg-white rounded-lg overflow-hidden mb-10 border border-slate-500">
        <div className="w-1/2 ">
          <Image src={productListImg} alt="a" position="relative" layout="fill" objectFit="contain"/>
        </div>
          <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
            <h3>
      <Link href={productLink}>
              <a
                href={productLink}
                className="
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
                        "
              >
                {productListTitle}
              </a>
        </Link>
            </h3>
        <div>
            <p className="text-base text-body-color leading-relaxed h-48   overflow-clip">
              {productListDesctiption}
            </p>
      <Link href={productLink}>
            <a
              className="
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
                     "
            >
              {productListBtn}
            </a>
            </Link>
      </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default ProductList;
