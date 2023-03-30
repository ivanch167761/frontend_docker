import {
  Action,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
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
  initialUserOrdersState,
} from "./types/storeTypes";
import axios from "axios";

/** ********************* GET ACTIONS **********************/
/***
 ***/
export const getProductList = createAsyncThunk(
  'products/getProducts',
  async () => {
    const host = 'https://backend.deepintersection.com'
    const response = await axios.get(`${host}/api/products`)
    return await response.data
  }
)

export const getProductDetail = createAsyncThunk(
  'products/getDetail',
  async (id: number) => {
    const host = 'https://backend.deepintersection.com'
    const response = await axios.get(`${host}/api/products/${id}`)
    return await response.data
  }
  return response.data;
});

export const getUserOrders = createAsyncThunk<
  [orderByIdDetail],
  undefined,
  { rejectValue: string }
>("order/getUserOrder", async function(_, { rejectWithValue }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.access}`,
    },
  };
  const host = "localhost:8000";
  const response = await axios.get(
    `https://${host}/api/orders/myorders`,
    config,
  );
  if (!response) {
    return rejectWithValue("error");
  }
  return response.data;
});

export const getOrderItemDetail = createAsyncThunk<
  orderByIdDetail,
  number,
  { rejectValue: string }
>("order/getOrder", async function(id, { rejectWithValue }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.access}`,
    },
  };
  const host = "localhost:8000";
  const response = await axios.get(`https://${host}/api/orders/${id}`, config);
  if (!response) {
    return rejectWithValue("error");
  }
  return response.data;
});

export const getCartProductsDetail = createAsyncThunk<
  cartItemDetail[],
  cartItem[],
  { rejectValue: string }
>("urlData/get", async (cartItemsList) => {
  const host = "localhost:8000";
  if (cartItemsList.length > 0) {
    const requests = cartItemsList.map(
      async (i) =>
        await axios.get(`https://${host}/api/products/${i.product_ID}`),
    );
    const getData = () =>
      Promise.all(requests).then((responseArray) =>
        responseArray.map((response) => response.data),
      );
    const data = await getData();
    console.log("in get cart product detail");
    console.log(data);
    return data;
  } else {
    return null;
  }
});
/** ******************** GET ACTIONS END ********************/

/** ********************* SEARCH REDUCER **********************/
export const productListSlice = createSlice({
  name: "productList",
  initialState: initialProductListState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.filteredProduct = state.productList.filter(({ name }) =>
        name.toLowerCase().includes(state.search.toLowerCase()),
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
      .addCase(getProductList.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
/***
 ***/
/** ********************* END SEARCH REDUCER **********************/

/** ********************* CART REDUCER **********************/
/***
 ***/

export const getCartProductsDetail = createAsyncThunk('urlData/get', async (cartItemsList:cartItem[]) => {
  const host = 'https://backend.deepintersection.com'
  const requests = cartItemsList.map(async (cartItem) =>
    await axios.get(`${host}/api/products/${cartItem.product_ID}`))
  const getData = () => Promise.all(requests).then(responseArray => responseArray.map(response => response.data))
  const data = await getData()
  return data
})

export const addToCartSlice = createSlice({
  name: "addToCart",
  initialState: initialCartItemsState,
  reducers: {
    setCart(state, action: PayloadAction<string>) {
      const cartStateString = action.payload ? JSON.parse(action.payload) : [];
      state.cartItemsList = cartStateString;
    },
    addToCart(state, action: PayloadAction<cartItem>) {
      const itemId = action.payload.product_ID;
      const itemQty = action.payload.qty;
      const existItem = state.cartItemsList.find(
        (x) => x.product_ID === itemId,
      );
      const newItem: cartItem = {
        product_ID: itemId,
        qty: itemQty,
      };
      if (existItem) {
        state.cartItemsList = state.cartItemsList.map((x) =>
          x.product_ID === itemId ? newItem : x,
        );
      } else {
        state.cartItemsList = [...state.cartItemsList, newItem];
      }
      state.cartItemsList = state.cartItemsList.filter((obj) => obj.qty !== 0);
      localStorage.setItem(
        "cartItemsList",
        JSON.stringify(state.cartItemsList),
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartProductsDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartProductsDetail.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cartItemsDetailList = payload;
        if (state.cartItemsList.length > 0) {
          state.cartItemsDetailList = state.cartItemsDetailList.map((obj1) => {
            const obj2 =
              state.cartItemsList.filter(
                (obj) => obj.product_ID === obj1._id,
              )[0] || {};
            return Object.assign({}, obj1, obj2);
          });
          state.cartTotalProductPrice = state.cartItemsDetailList
            .map((item) => item.qty * item.price)
            .reduce((accumulator, currentValue) => accumulator + currentValue);
          state.error = null;
        } else {
          state.cartTotalProductPrice = 0;
        }
      })
      .addCase(getCartProductsDetail.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
/** ********************* END CART REDUCER **********************/

/* ********************** ORDER DETAIL BYID**************************/
export const orderDetailSlice = createSlice({
  name: "orderDetail",
  initialState: initialOrderByIdState,
  reducers: {
    setOrderId(state, action: PayloadAction<number>) {
      state.orderByIdDetail._id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderItemDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderItemDetail.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orderByIdDetail = payload;
      })
      .addCase(getOrderItemDetail.rejected, (state, { payload }) => {
        (state.loading = false), (state.error = payload);
      });
  },
});
/* ********************** END ORDER DETAIL **************************/

/* ********************** USER ORDERS **************************/
export const userOrdersSlice = createSlice({
  name: "UserOrders",
  initialState: initialUserOrdersState,
  reducers: {
    //setOrderId (state, action: PayloadAction<number>){
    //  state.orderByIdDetail._id=action.payload
    //}
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userOrders = payload;
      })
      .addCase(getUserOrders.rejected, (state, { payload }) => {
        (state.loading = false), (state.error = payload);
      });
  },
});
/* ********************** USER ORDERS **************************/

/** ********************* QTY REDUCER **********************/
export const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: initialProductDetailState,
  reducers: {
    setQty(state, action: PayloadAction<number>) {
      if (action.payload < 0) {
        state.qty = 0;
      } else if (action.payload > state.product.countInStock) {
        state.qty = state.product.countInStock;
      } else {
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
        state.product = payload;
      })
      .addCase(getProductDetail.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
/** ********************* END QTY REDUCER **********************/

/** ********************* LOGIN REDUCER **********************/
const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const login =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading());
    const host = "localhost:8000";
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post<User>(
        `https://${host}/api/users/login/`,
        { username: email, password: password },
        config,
      );
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(setUser(data));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

export const login = (email: string, password: string) => async (dispatch: any) => {
  dispatch(setLoading())
  const host = 'https://backend.deepintersection.com'
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
    dispatch(setUser(JSON.parse(user)));
  }
};

/***
 ***/
/** ********************* END LOGIN REDUCER **********************/

/* ********************REGISTRATION********************* */

export const register = (name: string, email: string, password: string) => async (dispatch: any) => {
  dispatch(setLoading())
  const host = 'https://backend.deepintersection.com'
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
  const host = 'https://backend.deepintersection.com'
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

/* **********************************  SET USER ORDER  ************************ */
/***
 ***/
const orderSlice = createSlice({
  name: "order",
  initialState: initialMakeOrderState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setOrder: (state, action: PayloadAction<makeOrderItem>) => {
      state.loading = false;
      state.error = null;
      state.makeOrderDetail = action.payload;
    },
  },
});

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
    shippingOption: string,
  ) =>
    async (dispatch: AppDispatch) => {
      const orderItem = {
        name: name,
        address: address,
        city: city,
        country: country,
        postcode: postcode,
        phoneNumber: phoneNumber,
        comment: comment,
        payment: payment,
        shippingOption: shippingOption,
      };
      dispatch(setLoading());
      const cartItemsList = JSON.parse(localStorage.getItem("cartItemsList"));
      const host = "localhost:8000";
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        dispatch(setOrder(orderItem));
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
              shippingPrice: 0.25,
            },
          },
          config,
        );
        localStorage.setItem("responseOrder", JSON.stringify(data));
        localStorage.removeItem("cartItemsList");
        dispatch(setCart(""));
      } catch (error) {
        dispatch(setError(error.message));
      }
    };

/* **********************************  END SET USER ORDER  ************************ */

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
export const { setSearch } = productListSlice.actions;
export const { setOrderId } = orderDetailSlice.actions;
export const { setQty } = productDetailSlice.actions;
export const { addToCart, setCart } = addToCartSlice.actions;
export const { setLoading, setError, setUser, logout } = loginSlice.actions;
export const { setOrder } = orderSlice.actions;
/***
 ***/
/** ********************* ENDEXPORT REDUCERS **********************/

/** ********************* EXPORT DATA FROM STATE **********************/
/***
 ***/
export const selectSearch = (state: RootState) => state.productList.search;
export const selectCart = (state: RootState) => state.cart.cartItemsList;
export const selectCartTotalPrice = (state: RootState) =>
  state.cart.cartTotalProductPrice;
export const selectCartProducts = (state: RootState) =>
  state.cart.cartItemsDetailList;
export const selectProductDetail = (state: RootState) => state.product;
export const selectUserDetail = (state: RootState) => state.login.user;
export const selectError = (state: RootState) => state.login.error;
export const selectOrderDetail = (state: RootState) =>
  state.orderById.orderByIdDetail;
export const selectUserOrders = (state: RootState) =>
  state.userOrders.userOrders;
export const selectMakeOrder = (state: RootState) =>
  state.order.makeOrderDetail;

export const selectProductQty = (state: RootState) => state.product.qty;
export const selectFilteredProduct = (state: RootState) =>
  state.productList.filteredProduct;
/***
 ***/
/** ********************* EXPORT DATA FROM STATE **********************/

/** ********************* GET STORE **********************/
/***
 ***/
export let store = null;
export default function getStore(incomingPreloadState?: RootState) {
  store = configureStore({
    reducer: {
      productList: productListSlice.reducer,
      product: productDetailSlice.reducer,
      cart: addToCartSlice.reducer,
      login: loginSlice.reducer,
      order: orderSlice.reducer,
      orderById: orderDetailSlice.reducer,
      userOrders: userOrdersSlice.reducer,
    },
    preloadedState: incomingPreloadState,
  });
  return store;
}
/***
 ***/
/** ********************* GET STORE **********************/
