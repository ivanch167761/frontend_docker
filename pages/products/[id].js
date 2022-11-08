
import React, { useEffect } from "react";
import ProductScreen from "../../screens/productScreen";
import { useRouter } from 'next/router';
import { getProductsId, getProductData } from "../../lib/getProductsId";
import { listProductDetail } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
/*import { reset } from "../actions/counterActiond";*/
/*import { stepIncrement } from "../actions/stepCounterActions";*/




export async function getStaticPaths(){
  const paths = getProductsId();
  return {
    paths,
    fallback: false,
  };
}






function DetailContainer() {
  
  
  return (
     <ProductScreen id={id} productDetails={productDetails} /> 
  );
}

export default DetailContainer;
