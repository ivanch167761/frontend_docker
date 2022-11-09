
import React, { useEffect } from "react";
import ProductScreen from "../../screens/productScreen";
import { useRouter } from 'next/router';
import { GetProductsId, GetProductData } from "../../lib/getProductsId";
import { listProductDetail } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
/*import { reset } from "../actions/counterActiond";*/
/*import { stepIncrement } from "../actions/stepCounterActions";*/




export async function getStaticPaths(){
  const paths = GetProductsId();
  return {
    paths,
    fallback: false,
  };
}



export async function getStaticProps({ params }){
  const productData = GetProductData(params.id);
  return {
    props: {
      productData,
    },
  };
};



function DetailContainer(productData) {
  
  
  return (
     <ProductScreen id={1} productDetails={productData} /> 
  );
}

export default DetailContainer;
