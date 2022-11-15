
import ProductScreen from "../../screens/productScreen";

/*import { reset } from "../actions/counterActiond";*/
/*import { stepIncrement } from "../actions/stepCounterActions";*/


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'

import getStore, {
  getProductList,
  getProductDetail,
  selectFilteredProduct,
  selectProductDetail,
  selectSearch,
  setSearch,
} from "../../store";


export function useId(){
  const router = useRouter();
  const { id } = router.query;
  return Number(id);
}

function DetailContainer() {

  const productData = useSelector(selectProductDetail);



  return (
     <ProductScreen id={1} productDetails={productData} /> 
  );
}




export async function getServerSideProps(context) {
  

  const { id } = context.query;
  const store = getStore();
  await store.dispatch(getProductDetail(id));
  return {
    props: {
      initialState: store.getState(),
    },
  };
}


export default DetailContainer;