
import React, { useEffect } from "react";
import ProductScreen from "../../screens/productScreen";
import { useRouter } from 'next/router'
import { listProductDetail } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
/*import { reset } from "../actions/counterActiond";*/
/*import { stepIncrement } from "../actions/stepCounterActions";*/



function DetailContainer() {
  const router = useRouter()
  const { id } = router.query;
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  console.log("id before dispatch")
  console.log(id)
  useEffect(() => {
    dispatch(listProductDetail(id));
  }, [dispatch, id]);
  console.log("productDetails from page:")
  console.log(productDetails);

  return (
     <ProductScreen id={id} productDetails={productDetails} /> 
  );
}

export default DetailContainer;
