import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Action,
  PayloadAction,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";


/*
working producrt list:

[
    {
        "_id": 1,
        "category": "Keyboards",
        "user": "ik",
        "name": "ErgoDox",
        "image": "https://ams3...668175004",
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
        "image": "https://a......1668175004",
        "brand": "Nokia",
        "description": "test",
        "price": "1300.00",
        "countInStock": 2,
        "createdAt": "2022-11-04"
    }
]

*/

/********************** TYPE DEFINITION  **********************/
/***
***/
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

export type ProductDetailtState = {
  productD: Product;
  available: boolean;
  error: boolean;
  loading: boolean;
  qty:number;
};
/***
***/
/********************* TYPE DEFINITION END ********************/


/********************** INITIAL STATE DEFINITION  **********************/
/***
***/
const initialState: ProductListState = {
  productList: [],
  filteredProduct: [],
  search: "Nokia",
  loading: false,
  error: false,
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
  qty:1,
};
/***
***/
/********************* INITIAL STATE DEFINITION END ********************/





/*********************** GET ACTIONS **********************/
/***
***/
export const getProductList = createAsyncThunk("products/getProducts", async () => {
  const response = await await fetch(
    "backend.deepintersection.com/api/products"
  );
  return await response.json();
});


export const getProductDetail = createAsyncThunk("products/getDetail", async (id:number) => {
  const response = await await fetch(
    `backend.deepintersection.com/api/products/${id}`
  );
  return await response.json();
});
/***
***/
/********************** GET ACTIONS END ********************/



/*********************** SEARCH REDUCER **********************/
/***
***/
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
/***
***/
/*********************** END SEARCH REDUCER **********************/



/*********************** QTY REDUCER **********************/
/***
***/
export const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: initialDetailState,
  reducers: {
    setQty(state, action: PayloadAction<number>) {
      if (action.payload < 0){
        state.qty = 0;
      } else if (action.payload > state.productD.countInStock){
        state.qty = state.productD.countInStock;
      }else{
        state.qty = action.payload;
      }
    },
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
/***
***/
/*********************** END QTY REDUCER **********************/




export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

/*********************** EXPORT REDUCERS **********************/
/***
***/                                        
export const { setSearch } = productListSlice.actions;
export const { setQty } = productDetailSlice.actions;
/***
***/
/*********************** ENDEXPORT REDUCERS **********************/



/*********************** EXPORT DATA FROM STATE **********************/
/***
***/
export const selectSearch = (state: RootState) => state.productList.search;
export const selectProductDetail = (state: RootState) => state.product;
export const selectProductQty = (state: RootState) => state.product.qty;
export const  selectFilteredProduct = (state: RootState) =>
  state.productList.filteredProduct;
/***
***/
/*********************** EXPORT DATA FROM STATE **********************/




/*********************** GET STORE **********************/
/***
***/
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
/***
***/
/*********************** GET STORE **********************/



