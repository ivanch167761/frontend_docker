import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getStore, {
  getProductList,
  getProductDetail,
  selectFilteredProduct,
  selectSearch,
  setSearch,
  setDetail,
} from "../store";




import { listProduct } from "../actions/productActions"
import HomeScreen from "../screens/homeScreen"

function HomeContainer() {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);
  const productList = useSelector(selectFilteredProduct);




    return (
      <>
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            dispatch(setSearch(e.target.value));
            dispatch(setDetail(e.target.value));
          }}
        />
      </div>
    <HomeScreen productList={productList} />
    </>
  )
}

export async function getServerSideProps() {
  const store = getStore();
  await store.dispatch(getProductList());
  return {
    props: {
      initialState: store.getState(),
    },
  };
}



export default HomeContainer;



