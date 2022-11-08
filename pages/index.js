import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { listProduct } from "../actions/productActions"
import HomeScreen from "../screens/homeScreen"

function HomeContainer() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);
 

    return (
    <HomeScreen productList={productList}/>
  )
}
export default HomeContainer;
