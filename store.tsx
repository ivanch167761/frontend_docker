import {
  Action,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  configureStore,
  ThunkAction
} from '@reduxjs/toolkit'
import {
  Product,
  initialOrderByIdState,
  cartItem,
  initialCartItemsState,
  cartItemDetail,
  initialProductListState,
  initialProductDetailState,
  initialMakeOrderState,
  makeOrderItem,
  initialLoginState,
  User,
  orderByIdDetail,
  Category,
  initialUserOrdersState,
  initialCategoryListState,
  initialCategoryDetailState,
  initialCategoryProductListState
} from './types/storeTypes'
import axios from 'axios'

// const host = 'localhost:8000'
const host = 'backend.deepintersection.com'
let store = null
export type AppDispatch = typeof store.dispatch
/** ********************* GET ACTIONS **********************/
export const getProductList = createAsyncThunk<
  Product[],
  undefined,
  { rejectValue: string }
>("products/getProducts", async(_, { rejectWithValue }) => {
  const response = await axios.get  (`https://${host}/api/products`)
  if (!response) {
    return rejectWithValue('error')
  }
  return response.data
})




export const getCategoryProductList = createAsyncThunk<
  Product[],
  number,
  { rejectValue: string }
>('products/getProducts', async (id, { rejectWithValue }) => {
  const response = await axios.get(`https://${host}/api/categories/${id}`)
  if (!response) {
    return rejectWithValue('error')
  }
  return response.data
})

export const getCategoryList = createAsyncThunk<
  Category[],
  undefined,
  { rejectValue: string }
>('categories/getCategory', async (_, { rejectWithValue }) => {
  const response = await axios.get(`https://${host}/api/categories`)
  if (!response) {
    return rejectWithValue('error')
  }
  return response.data
})

export const getProductDetail = createAsyncThunk<
  Product,
  number,
  { rejectValue: string }
>('products/getDetail', async (id, { rejectWithValue }) => {
  const response = await axios.get(`https://${host}/api/products/${id}`)
  if (!response) {
    return rejectWithValue('error')
  }
  return response.data
})

export const getCategoryDetail = createAsyncThunk<
  Category,
  number,
  { rejectValue: string }
>('products/getDetail', async (id, { rejectWithValue }) => {
  const response = await axios.get(`https://${host}/api/categories/detail/${id}`)
  if (!response) {
    return rejectWithValue('error')
  }
  return response.data
})

export const getUserOrders = createAsyncThunk<
  [orderByIdDetail],
  undefined,
  { rejectValue: string }
>('order/getUserOrder', async function (_, { rejectWithValue }) {
  const user = JSON.parse(localStorage.getItem('user'))
  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${user.access}`
    }
  }
  const response = await axios.get(
    `https://${host}/api/orders/myorders`,
    config
  )
  if (!response) {
    return rejectWithValue('error')
  }
  return response.data
})

export const getOrderItemDetail = createAsyncThunk<
  orderByIdDetail,
  number,
  { rejectValue: string }
>('order/getOrder', async function (id, { rejectWithValue }) {
  const user = JSON.parse(localStorage.getItem('user'))
  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${user.access}`
    }
  }
  const response = await axios.get(`https://${host}/api/orders/${id}`, config)
  if (!response) {
    return rejectWithValue('error')
  }
  return response.data
})

export const getCartProductsDetail = createAsyncThunk<
  cartItemDetail[],
  cartItem[],
  { rejectValue: string }
>('urlData/get', async (cartItemsList) => {
  if (cartItemsList.length > 0) {
    const requests = cartItemsList.map(
      async (i) =>
        await axios.get(`https://${host}/api/products/${i.product_ID}`)
    )
    const getData = () =>
      Promise.all(requests).then((responseArray) =>
        responseArray.map((response) => response.data)
      )
    const data = await getData()
    console.log('in get cart product detail')
    console.log(data)
    return data
  } else {
    return null
  }
})
/** ******************** GET ACTIONS END ********************/

/** ********************* SEARCH REDUCER **********************/
export const productListSlice = createSlice({
  name: 'productList',
  initialState: initialProductListState,
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
      .addCase(getProductList.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
  }
})

export const categoryProductListSlice = createSlice({
  name: 'categoryProductList',
  initialState: initialCategoryProductListState,
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
      .addCase(getCategoryProductList.pending, (state) => {
        state.loading = true
      })
      .addCase(getCategoryProductList.fulfilled, (state, { payload }) => {
        state.loading = false
        state.productList = payload
        state.filteredProduct = payload
      })
      .addCase(getCategoryProductList.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
  }
})

export const categoryListSlice = createSlice({
  name: 'categoryList',
  initialState: initialCategoryListState,
  reducers: {
    setCategorySearch (state, action: PayloadAction<string>) {
      state.search = action.payload
      state.filteredCategory = state.categoryList.filter(({ category }) =>
        category.toLowerCase().includes(state.search.toLowerCase())
      )
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryList.pending, (state) => {
        state.loading = true
      })
      .addCase(getCategoryList.fulfilled, (state, { payload }) => {
        state.loading = false
        state.categoryList = payload
        state.filteredCategory = payload
      })
      .addCase(getCategoryList.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
  }
})
/***
 ***/
/** ********************* END SEARCH REDUCER **********************/

/** ********************* CART REDUCER **********************/
export const addToCartSlice = createSlice({
  name: 'addToCart',
  initialState: initialCartItemsState,
  reducers: {
    setCart (state, action: PayloadAction<string>) {
      const cartStateString = action.payload ? JSON.parse(action.payload) : []
      state.cartItemsList = cartStateString
    },
    addToCart (state, action: PayloadAction<cartItem>) {
      const itemId = action.payload.product_ID
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
      state.cartItemsList = state.cartItemsList.filter((obj) => obj.qty !== 0)
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
        if (state.cartItemsList.length > 0) {
          state.cartItemsDetailList = state.cartItemsDetailList.map((obj1) => {
            const obj2 =
              state.cartItemsList.filter(
                (obj) => obj.product_ID === obj1._id
              )[0] || {}
            return Object.assign({}, obj1, obj2)
          })
          state.cartTotalProductPrice = state.cartItemsDetailList
            .map((item) => item.qty * item.price)
            .reduce((accumulator, currentValue) => accumulator + currentValue)
          state.error = null
        } else {
          state.cartTotalProductPrice = 0
        }
      })
      .addCase(getCartProductsDetail.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
  }
})
/** ********************* END CART REDUCER **********************/

/* ********************** ORDER DETAIL BYID**************************/
export const orderDetailSlice = createSlice({
  name: 'orderDetail',
  initialState: initialOrderByIdState,
  reducers: {
    setOrderId (state, action: PayloadAction<number>) {
      state.orderByIdDetail._id = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderItemDetail.pending, (state) => {
        state.loading = true
      })
      .addCase(getOrderItemDetail.fulfilled, (state, { payload }) => {
        state.loading = false
        state.orderByIdDetail = payload
      })
      .addCase(getOrderItemDetail.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
  }
})

export const categoryDetailSlice = createSlice({
  name: 'CategoryDetail',
  initialState: initialCategoryDetailState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryDetail.pending, (state) => {
        state.loading = true
      })
      .addCase(getCategoryDetail.fulfilled, (state, { payload }) => {
        state.loading = false
        state.category = payload
      })
      .addCase(getCategoryDetail.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
  }
})
/* ********************** END ORDER DETAIL **************************/

/* ********************** USER ORDERS **************************/
export const userOrdersSlice = createSlice({
  name: 'UserOrders',
  initialState: initialUserOrdersState,
  reducers: {
    // setOrderId (state, action: PayloadAction<number>){
    //  state.orderByIdDetail._id=action.payload
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true
      })
      .addCase(getUserOrders.fulfilled, (state, { payload }) => {
        state.loading = false
        state.userOrders = payload
      })
      .addCase(getUserOrders.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
  }
})
/* ********************** USER ORDERS **************************/

/** ********************* QTY REDUCER **********************/
export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState: initialProductDetailState,
  reducers: {
    setLoadingProduct: (state) => {
      state.loading = true
      state.error = null
    },
    setErrorProduct: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    setProduct: (state, action: PayloadAction<Product>) => {
      state.loading = false
      state.error = null
      state.product = action.payload
    },
    setQty (state, action: PayloadAction<number>) {
      if (action.payload < 0) {
        state.qty = 0
      } else if (action.payload > state.product.countInStock) {
        state.qty = state.product.countInStock
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
        state.product = payload
      })
      .addCase(getProductDetail.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
  }
})

export const updateCategory =
  (updatedCategory: Category) =>
    async (dispatch: AppDispatch) => {
      dispatch(setLoading())
      const user = JSON.parse(localStorage.getItem('user'))
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${user.token}`
          }
        }
        await axios.put(
          `https://${host}/api/categories/update/${updatedCategory._id}`,
          updatedCategory,
          config
        )
      } catch (error) {
        dispatch(setError(error.message))
      }
    }

export const updateProduct =
  (updatedProduct: Product) =>
    async (dispatch: AppDispatch) => {
      dispatch(setLoading())
      const user = JSON.parse(localStorage.getItem('user'))
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${user.token}`
          }
        }
        const { data } = await axios.put(
          `https://${host}/api/products/update/${updatedProduct._id}`,
          updatedProduct,
          config
        )
        dispatch(setProduct(data))
      } catch (error) {
        dispatch(setErrorProduct(error.message))
      }
    }
/** ********************* END QTY REDUCER **********************/

/** ********************* LOGIN REDUCER **********************/
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

export const login =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading())
    try {
      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      }
      const { data } = await axios.post<User>(
        `https://${host}/api/users/login/`,
        { username: email, password },
        config
      )
      localStorage.setItem('user', JSON.stringify(data))
      dispatch(setUser(data))
    } catch (error) {
      dispatch(setError(error.message))
    }
  }

export const checkLoginStatus = () => (dispatch: AppDispatch) => {
  const user = localStorage.getItem('user')
  if (user) {
    dispatch(setUser(JSON.parse(user)))
  }
}

/***
 ***/
/** ********************* END LOGIN REDUCER **********************/

/* ********************REGISTRATION********************* */

export const register =
  (name: string, email: string, password: string) =>
    async (dispatch: AppDispatch) => {
      dispatch(setLoading())
      try {
        const config = {
          headers: {
            'Content-type': 'application/json'
          }
        }
        const { data } = await axios.post<User>(
          `https://${host}/api/users/register/`,
          { name, email, password },
          config
        )
        localStorage.setItem('user', JSON.stringify(data))
        dispatch(setUser(data))
      } catch (error) {
        dispatch(setError(error.message))
      }
    }

/* **************************END REGISTRATION ******************* */

/* **********************************UPDATE PROFILE************************ */
export const updateUserProfile =
  (name: string, email: string, password: string) =>
    async (dispatch: AppDispatch) => {
      const user = JSON.parse(localStorage.getItem('user'))
      name ? (user.name = name) : console.log('name not change')
      email ? (user.email = email) : console.log('email not change')
      password
        ? (user.password = password)
        : console.log('password not change')
      dispatch(setLoading())
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${user.token}`
          }
        }
        const { data } = await axios.put(
          `https://${host}/api/users/profile/update/`,
          user,
          config
        )
        localStorage.setItem('user', JSON.stringify(data))
        dispatch(setUser(data))
      } catch (error) {
        dispatch(setError(error.message))
      }
    }

/* **********************************END UPDATE PROFILE************************ */

/* **********************************  CREATE PRODUCT  ************************ */
/***
 ***/
export const deleteProduct =
  (id: number) =>
    async (dispatch: AppDispatch) => {
      dispatch(setLoading())
      const user = JSON.parse(localStorage.getItem('user'))
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${user.token}`
          }
        }
        const { data } = await axios.delete(
          `https://${host}/api/products/delete/${id}`,
          config
        )
        dispatch(setError(`${data} was deleted`))
      } catch (error) {
        dispatch(setError(error.message))
      }
    }

export const deleteCategory =
  (id: number) =>
    async (dispatch: AppDispatch) => {
      dispatch(setLoading())
      const user = JSON.parse(localStorage.getItem('user'))
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${user.token}`
          }
        }
        const { data } = await axios.delete(
          `https://${host}/api/category/delete/${id}`,
          config
        )
        dispatch(setError(`${data} was deleted`))
      } catch (error) {
        dispatch(setError(error.message))
      }
    }

export const createProduct =
  () =>
    async (dispatch: AppDispatch) => {
      dispatch(setLoading())
      const user = JSON.parse(localStorage.getItem('user'))
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${user.token}`
          }
        }
        const { data } = await axios.post(
          `https://${host}/api/products/create/`,
          '',
          config
        )
        console.log(data)
        dispatch(setProduct(data))
      } catch (error) {
        dispatch(setError(error.message))
      }
    }

/* **********************************  END SET USER ORDER  ************************ */

/* **********************************  SET USER ORDER  ************************ */
/***
 ***/
const orderSlice = createSlice({
  name: 'order',
  initialState: initialMakeOrderState,
  reducers: {
    setLoading: (state) => {
      state.loading = true
      state.error = null
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    setOrder: (state, action: PayloadAction<makeOrderItem>) => {
      state.loading = false
      state.error = null
      state.makeOrderDetail = action.payload
    }
  }
})

export const setUserOrder =
  (
    name: string,
    address: string,
    city: string,
    country: string,
    postcode: number,
    phoneNumber: number,
    comment: string,
    payment: string,
    shippingOption: string
  ) =>
    async (dispatch: AppDispatch) => {
      const orderItem = {
        name,
        address,
        city,
        country,
        postcode,
        phoneNumber,
        comment,
        payment,
        shippingOption
      }
      dispatch(setLoading())
      const cartItemsList = JSON.parse(localStorage.getItem('cartItemsList'))
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${user.token}`
          }
        }
        dispatch(setOrder(orderItem))
        const { data } = await axios.post(
          `https://${host}/api/orders/add/`,
          {
            paymentMethod: orderItem.payment,
            itemsPrice: 200,
            shippingPrice: 20,
            taxPrice: 0.21,
            totalPrice: 9999,
            orderItems: cartItemsList,
            shippingAddress: {
              address: orderItem.address,
              city: orderItem.city,
              postalcode: orderItem.postcode,
              country: orderItem.country,
              shippingPrice: 0.25
            }
          },
          config
        )
        localStorage.setItem('responseOrder', JSON.stringify(data))
        localStorage.removeItem('cartItemsList')
        dispatch(setCart(''))
      } catch (error) {
        dispatch(setError(error.message))
      }
    }

/* **********************************  END SET USER ORDER  ************************ */

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

/** ********************* EXPORT REDUCERS **********************/
/***
 ***/
export const { setSearch } = productListSlice.actions
export const { setCategorySearch } = categoryListSlice.actions
export const { setOrderId } = orderDetailSlice.actions
export const { setQty, setProduct, setErrorProduct, setLoadingProduct } = productDetailSlice.actions
export const { addToCart, setCart } = addToCartSlice.actions
export const { setLoading, setError, setUser, logout } = loginSlice.actions
export const { setOrder } = orderSlice.actions
/***
 ***/
/** ********************* ENDEXPORT REDUCERS **********************/

/** ********************* EXPORT DATA FROM STATE **********************/
/***
 ***/
export const selectSearch = (state: RootState) => state.productList.search
export const selectCategorySearch = (state: RootState) => state.categoryList.search
export const selectCart = (state: RootState) => state.cart.cartItemsList
export const selectCartTotalPrice = (state: RootState) =>
  state.cart.cartTotalProductPrice
export const selectCartProducts = (state: RootState) =>
  state.cart.cartItemsDetailList
export const selectProductDetail = (state: RootState) => state.product
export const selectCategoryDetail = (state: RootState) => state.categoryDetail
export const selectUserDetail = (state: RootState) => state.login.user
export const selectError = (state: RootState) => state.login.error
export const selectOrderDetail = (state: RootState) =>
  state.orderById.orderByIdDetail
export const selectUserOrders = (state: RootState) =>
  state.userOrders.userOrders
export const selectMakeOrder = (state: RootState) =>
  state.order.makeOrderDetail
export const selectProductQty = (state: RootState) => state.product.qty
export const selectFilteredProduct = (state: RootState) =>
  state.productList.filteredProduct
export const selectFilteredCategory = (state: RootState) =>
  state.categoryList.filteredCategory
export const selectCategoryFilteredProduct = (state: RootState) =>
  state.categoryProduct.filteredProduct
export const selectProductList = (state: RootState) =>
  state.productList
export const selectCategoryList = (state: RootState) =>
  state.categoryList
/***
 ***/
/** ********************* EXPORT DATA FROM STATE **********************/

/** ********************* GET STORE **********************/
/***
 ***/
export default function getStore (incomingPreloadState?: RootState) {
  store = configureStore({
    reducer: {
      productList: productListSlice.reducer,
      product: productDetailSlice.reducer,
      cart: addToCartSlice.reducer,
      login: loginSlice.reducer,
      order: orderSlice.reducer,
      orderById: orderDetailSlice.reducer,
      userOrders: userOrdersSlice.reducer,
      categoryProduct: categoryProductListSlice.reducer,
      categoryList: categoryListSlice.reducer,
      categoryDetail: categoryDetailSlice.reducer
    },
    preloadedState: incomingPreloadState
  })
  return store
}
/***
 ***/
/** ********************* GET STORE **********************/
