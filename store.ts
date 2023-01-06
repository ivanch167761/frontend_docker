import {
  Action,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  configureStore,
  ThunkAction
} from '@reduxjs/toolkit'

/*
working producrt list:

[
    {
        '_id': 1,
        'category': 'Keyboards',
        'user': 'ik',
        'name': 'ErgoDox',
        'image': 'https://ams3...668175004',
        'brand': 'ErgoDox',
        'description': 'To edit later',
        'price': '322.00',
        'countInStock': 5,
        'createdAt': '2022-11-03'
    },
    {
        '_id': 2,
        'category': 'Keyboards',
        'user': 'ik',
        'name': 'Nokia T21',
        'image': 'https://a......1668175004',
        'brand': 'Nokia',
        'description': 'test',
        'price': '1300.00',
        'countInStock': 2,
        'createdAt': '2022-11-04'
    }
]

*/

/** ******************** TYPE DEFINITION  **********************/
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
  qty: number;
};

interface cartItem {
  product_ID: Product['_id'];
  qty: number;
  name: Product['name'];
  price: Product['price'];
  countInStock: Product['countInStock'];
  img: Product['image'];
  imgAlt: Product['name'];
  description: Product['description'];
}

export type cartItemsListState = {
  cartItemsList: cartItem[];
  error: boolean;
  loading: boolean;
};

/***
 ***/
/** ******************* TYPE DEFINITION END ********************/

/** ******************** INITIAL STATE DEFINITION  **********************/
/***
 ***/
const initialState: ProductListState = {
  productList: [],
  filteredProduct: [],
  search: 'SEARCH',
  loading: false,
  error: false
}

const initialDetailState: ProductDetailtState = {
  productD: {
    _id: 1,
    category: 'category',
    user: 'string',
    name: 'string',
    image: 'string',
    brand: 'string',
    description: 'string',
    price: 'string',
    countInStock: 1000,
    createdAt: 'string'
  },
  available: false,
  error: false,
  loading: false,
  qty: 10
}

export const defaultItem: cartItem = {
  product_ID: 2,
  countInStock: 22,
  qty: 2,
  price: '22',
  name: 'HOLA',
  img: 'image',
  imgAlt: 'imgAlt',
  description: 'text'
}

const initialCartState: cartItemsListState = {
  cartItemsList: [defaultItem],
  loading: false,
  error: false
}

/***
 ***/
/** ******************* INITIAL STATE DEFINITION END ********************/

/** ********************* GET ACTIONS **********************/
/***
 ***/
export const getProductList = createAsyncThunk(
  'products/getProducts',
  async () => {
    const host = process.env.BACKEND_HOST
    const response = await fetch(`https://${host}/api/products`)
    console.log(response)
    return await response.json()
  }
)

export const getProductDetail = createAsyncThunk(
  'products/getDetail',
  async (id: number) => {
    const host = process.env.BACKEND_HOST
    const response = await fetch(`https://${host}/api/products/${id}`)
    return await response.json()
  }
)
/***
 ***/
/** ******************** GET ACTIONS END ********************/

/** ********************* SEARCH REDUCER **********************/
/***
 ***/
export const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    setSearch (state, action: PayloadAction<string>) {
      state.search = action.payload
      state.filteredProduct = state.productList.filter(({ name }) =>
        name.toLowerCase().includes(state.search.toLowerCase())
      )
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductList.pending, (state) => {
        state.loading = true
      })
      .addCase(getProductList.fulfilled, (state, { payload }) => {
        state.loading = false
        state.productList = payload
        state.filteredProduct = payload
      })
      .addCase(getProductList.rejected, (state) => {
        state.loading = false
        state.error = true
      })
  }
})
/***
 ***/
/** ********************* END SEARCH REDUCER **********************/

/** ********************* CART REDUCER **********************/
/***
 ***/
export const addToCartSlice = createSlice({
  name: 'addToCart',
  initialState: initialCartState,
  reducers: {
    setCart (state, action: PayloadAction<string>) {
      const cartStateString = action.payload ? JSON.parse(action.payload) : []
      state.cartItemsList = cartStateString
    },
    addToCart (state, action: PayloadAction<{ item: Product; qty: number }>) {
      const item = action.payload.item
      const itemId = item._id
      const itemQty = action.payload.qty
      const existItem = state.cartItemsList.find(
        (x) => x.product_ID === itemId
      )
      const newItem: cartItem = {
        product_ID: itemId,
        countInStock: item.countInStock,
        qty: itemQty,
        price: item.price,
        name: item.name,
        img: item.image,
        imgAlt: item.name,
        description: item.description
      }
      if (existItem) {
        state.cartItemsList = state.cartItemsList.map((x) =>
          x.product_ID === itemId ? newItem : x
        )
      } else {
        state.cartItemsList = [...state.cartItemsList, newItem]
      }
      localStorage.setItem(
        'cartItemsList',
        JSON.stringify(state.cartItemsList)
      )
    }
  }
})

/***
 ***/
/** ********************* END CART REDUCER **********************/

/** ********************* QTY REDUCER **********************/
/***
 ***/
export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState: initialDetailState,
  reducers: {
    setQty (state, action: PayloadAction<number>) {
      if (action.payload < 0) {
        state.qty = 0
      } else if (action.payload > state.productD.countInStock) {
        state.qty = state.productD.countInStock
      } else {
        state.qty = action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetail.pending, (state) => {
        state.loading = true
      })
      .addCase(getProductDetail.fulfilled, (state, { payload }) => {
        state.loading = false
        state.productD = payload
      })
      .addCase(getProductDetail.rejected, (state) => {
        state.loading = false
        state.error = true
      })
  }
})
/***
 ***/
/** ********************* END QTY REDUCER **********************/

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

/** ********************* EXPORT REDUCERS **********************/
/***
 ***/
export const { setSearch } = productListSlice.actions
export const { setQty } = productDetailSlice.actions
export const { addToCart, setCart } = addToCartSlice.actions
/***
 ***/
/** ********************* ENDEXPORT REDUCERS **********************/

/** ********************* EXPORT DATA FROM STATE **********************/
/***
 ***/
export const selectSearch = (state: RootState) => state.productList.search
export const selectCart = (state: RootState) => state.cart.cartItemsList
export const selectProductDetail = (state: RootState) => state.product
export const selectProductQty = (state: RootState) => state.product.qty
export const selectFilteredProduct = (state: RootState) =>
  state.productList.filteredProduct
/***
 ***/
/** ********************* EXPORT DATA FROM STATE **********************/

/** ********************* GET STORE **********************/
/***
 ***/
export let store = null
export default function getStore (incomingPreloadState?: RootState) {
  store = configureStore({
    reducer: {
      productList: productListSlice.reducer,
      product: productDetailSlice.reducer,
      cart: addToCartSlice.reducer
    },
    preloadedState: incomingPreloadState
  })
  return store
}
/***
 ***/
/** ********************* GET STORE **********************/
