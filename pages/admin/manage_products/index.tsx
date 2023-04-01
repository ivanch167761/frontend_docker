import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getStore, {
  getProductList,
  selectSearch,
  setSearch,
  checkLoginStatus,
  selectProductList,
  AppDispatch,
} from "../../../store";
import AdminProductsScreen from "../../../screens/adminProductsScreen";

function adminProductsContainer() {
  const dispatch: AppDispatch = useDispatch();
  const search = useSelector(selectSearch);
  const productList = useSelector(selectProductList);
  useEffect(() => {
    dispatch(checkLoginStatus());
  }, []);
  return (
    <>
      <div>
        <input
          type='text'
          value={search}
          onChange={(e) => {
            dispatch(setSearch(e.target.value));
          }}
        />
      </div>
      <AdminProductsScreen productList={productList} />
    </>
  );
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

export default adminProductsContainer;
