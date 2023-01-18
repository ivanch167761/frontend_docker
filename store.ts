import {
  Action,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  configureStore,
  ThunkAction
} from '@reduxjs/toolkit'
import axios from 'axios'
import { userInfo } from 'os';

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
}

export type cartItemDetail = {
  cartProductDetail: any,
  qty: number,
  error: boolean,
  loading: boolean,
}
export type cartItemsState = {
  cartItemsDetailList: any,
  cartItemsList: cartItem[],
  loading: boolean,
  error: any
};

interface User {
    _id: number,
    username: string,
    email: string,
    name: string,
    isAdmin: boolean,
};

interface LoginState {
  loading: boolean;
  error: string | null;
  user: User | null;
}

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
  qty: 1
}

export const defaultItem: cartItem = {
  product_ID: 2,
  qty: 2
}

export const defaultItemDetail: cartItemDetail = {
  cartProductDetail: {
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
  qty: 0,
  error: false,
  loading: false
}

export const initialCartItemsState: cartItemsState = {
  cartItemsList: [defaultItem],
  cartItemsDetailList: [defaultItemDetail],
  loading: false,
  error: null
}

export const initialLoginState: LoginState = {
  loading: false,
  error: null,
  user: null
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
    const host = 'http://deeptest-deployment:80'
    const response = await axios.get(`${host}/api/products`)
    return await response.data
  }
)

export const getProductDetail = createAsyncThunk(
  'products/getDetail',
  async (id: number) => {
    const host = 'http://deeptest-deployment:80'
    const response = await axios.get(`${host}/api/products/${id}`)
    return await response.data
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

export const getCartProductsDetail = createAsyncThunk('urlData/get', async (cartItemsList:cartItem[]) => {
  const host = 'http://deeptest-deployment:80'
  const requests = cartItemsList.map(async (cartItem) =>
    await axios.get(`${host}/api/products/${cartItem.product_ID}`))
  const getData = () => Promise.all(requests).then(responseArray => responseArray.map(response => response.data))
  const data = await getData()
  return data
})

export const addToCartSlice = createSlice({
  name: 'addToCart',
  initialState: initialCartItemsState,
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
        qty: itemQty
      }
      if (existItem) {
        state.cartItemsList = state.cartItemsList.map((x) =>
          x.product_ID === itemId ? newItem : x
        )
      } else {
        state.cartItemsList = [...state.cartItemsList, newItem]
      }
      state.cartItemsList = state.cartItemsList.filter(obj => obj.qty !== 0)
      localStorage.setItem(
        'cartItemsList',
        JSON.stringify(state.cartItemsList)
      )
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartProductsDetail.pending, (state) => {
        state.loading = true
      })
      .addCase(getCartProductsDetail.fulfilled, (state, { payload }) => {
        state.loading = false
        state.cartItemsDetailList = payload
        state.error = null
      })
      .addCase(getCartProductsDetail.rejected, (state) => {
        state.loading = false
        state.error = true
      })
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

/** ********************* LOGIN REDUCER **********************/
/***
 ***/
const loginSlice = createSlice({
  name: 'login',
  initialState: initialLoginState,
  reducers: {
    setLoading: (state) => {
      state.loading = true
      state.error = null
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.loading = false
      state.error = null
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
      localStorage.removeItem('user')
    }
  }
})

export const login = (email: string, password: string) => async (dispatch: any) => {
  dispatch(setLoading())
  const host = 'http://deeptest-deployment:80'
  try {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    const { data } = await axios.post<User>(`${host}/api/users/login/`,
      { username: email, password: password }, config)
    localStorage.setItem('user', JSON.stringify(data))
    dispatch(setUser(data))
  } catch (error) {
    dispatch(setError(error.message))
  }
}

export const checkLoginStatus = () => (dispatch: any) => {
  const user = localStorage.getItem('user')
  if (user) {
    dispatch(setUser(JSON.parse(user)))
  }
}

/***
 ***/
/** ********************* END LOGIN REDUCER **********************/

/* ********************REGISTRATION********************* */

export const register = (name: string, email: string, password: string) => async (dispatch: any) => {
  dispatch(setLoading())
  const host = 'http://deeptest-deployment:80'
  try {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    const { data } = await axios.post<User>(`${host}/api/users/register/`,
      { name: name, email: email, password: password }, config)
    localStorage.setItem('user', JSON.stringify(data))
    dispatch(setUser(data))
  } catch (error) {
    dispatch(setError(error.message))
  }
}

/* **************************END REGISTRATION ******************* */

/* **********************************UPDATE PROFILE************************ */
export const updateUserProfile = (name: string, email: string, password: string) => async (dispatch: any) => {
  const user = JSON.parse(localStorage.getItem('user'))
  name ? user.name = name : console.log("name wasn't change")
  email ? user.email = email : console.log("email wasn't change")
  password ? user.password = password : console.log("password wasn't change")
  dispatch(setLoading())
  const host = 'http://deeptest-deployment:80'
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${user.token}`
      }
    }
    localStorage.setItem('headers', JSON.stringify(config))
    localStorage.setItem('updatedUser', JSON.stringify(user))
    const { data } = await axios.put(`${host}/api/users/profile/update/`,
      user, config)
    localStorage.setItem('user', JSON.stringify(data))
    dispatch(setUser(data))
  } catch (error) {
    dispatch(setError(error.message))
  }
}

/* **********************************END UPDATE PROFILE************************ */

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
export const { setLoading, setError, setUser, logout } = loginSlice.actions
/***
 ***/
/** ********************* ENDEXPORT REDUCERS **********************/

/** ********************* EXPORT DATA FROM STATE **********************/
/***
 ***/
export const selectSearch = (state: RootState) => state.productList.search
export const selectCart = (state: RootState) => state.cart.cartItemsList
export const selectCartProducts = (state: RootState) => state.cart.cartItemsDetailList
export const selectProductDetail = (state: RootState) => state.product
export const selectUserDetail = (state: RootState) => state.login.user
export const selectError = (state: RootState) => state.login.error

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
      cart: addToCartSlice.reducer,
      login: loginSlice.reducer
    },
    preloadedState: incomingPreloadState
  })
  return store
}
/***
 ***/
/** ********************* GET STORE **********************/
