import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { listProductDetail } from "../actions/productActions";

export function getProductsId(id){
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);
    return productList.map((product)=>{
        return{
            params:{
                id: product._id
            }
        };
    });



}



export function getProductData(id){
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);

    useEffect(() => {
        dispatch(listProductDetail(id));
      }, [dispatch, id]);
    return productDetails
  }