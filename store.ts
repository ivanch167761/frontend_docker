import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Action,
  PayloadAction,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { productListReducer, productDetailsReducer, } from "./reducers/productReducer";


/*
working producrt list:

[
    {
        "_id": 1,
        "category": "Keyboards",
        "user": "ik",
        "name": "ErgoDox",
        "image": "https://ams3.digitaloceanspaces.com/deeptest/media/ergodox_ez-scaled.jpg?AWSAccessKeyId=DO00BHUJL9NGGENRF63V&Signature=%2Feq2t2Vj6MxffPSfzoSGSWO8dJ4%3D&Expires=1668175004",
        "brand": "ErgoDox",
        "description": "To edit later",
        "price": "322.00",
        "countInStock": 5,
        "createdAt": "2022-11-03"
    },
    {
        "_id": 2,
        "category": "Keyboards",
        "user": "ik",
        "name": "Nokia T21",
        "image": "https://ams3.digitaloceanspaces.com/deeptest/media/a.webp?AWSAccessKeyId=DO00BHUJL9NGGENRF63V&Signature=nE%2Bp2i6X6eIm1B1Om51gDWYNT3o%3D&Expires=1668175004",
        "brand": "Nokia",
        "description": "test",
        "price": "1300.00",
        "countInStock": 2,
        "createdAt": "2022-11-04"
    }
]

*/

interface Product {
  _id: number;
  category: string;
  user: string;
  name: string;
  image: string;
  brand: string;
  description: string;
  price: string;
  countInStock: number;
  createdAt: string;

}

export type ProductListState = {
  productList: Product[];
  search: string;
  filteredProduct: Product[];
  loading: boolean;
  error: boolean;
};

const initialState: ProductListState = {
  productList: [],
  filteredProduct: [],
  search: "Nokia",
  loading: false,
  error: false,
};

export type ProductDetailtState = {
  productD: Product;
  available: boolean;
  error: boolean;
  loading: boolean;
  qty:number;
};

const initialDetailState: ProductDetailtState = {
  productD: {
    _id: 1,
    category: "category",
    user: "string",
    name: "string",
    image: "string",
    brand: "string",
    description: "string",
    price: "string",
    countInStock: 1000,
    createdAt: "string",  
  },
  available: false,
  error: false,
  loading: false,
  qty:0,
};



export const getProductList = createAsyncThunk("products/getProducts", async () => {
  const response = await await fetch(
    "http://134.209.135.168/api/products"
  );
  return await response.json();
});


export const getProductDetail = createAsyncThunk("products/getDetail", async (id:number) => {
  const response = await await fetch(
    `http://134.209.135.168:80/api/products/${id}`
  );
  return await response.json();
});



export const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.filteredProduct = state.productList.filter(({ name }) =>
        name.toLowerCase().includes(state.search.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.productList = payload;
        state.filteredProduct = payload;
      })
      .addCase(getProductList.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: initialDetailState,
  reducers: {
    setDetail(state, action: PayloadAction<string>) {
    state.productD.description = "AAAAA";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductDetail.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.productD = payload;
      })
      .addCase(getProductDetail.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});






export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


export const { setSearch } = productListSlice.actions;
export const { setDetail } = productDetailSlice.actions;

export const selectSearch = (state: RootState) => state.productList.search;
export const selectProductDetail = (state: RootState) => state.product;
export const  selectFilteredProduct = (state: RootState) =>
  state.productList.filteredProduct;

export let store = null;

export default function getStore(incomingPreloadState?: RootState) {
  store = configureStore({
    reducer: {
      productList: productListSlice.reducer,
      product: productDetailSlice.reducer,
    },
    preloadedState: incomingPreloadState,
  });
  return store;
}





