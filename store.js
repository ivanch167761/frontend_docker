import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer, productDetailsReducer, } from "./reducers/productReducer";
import thunk from "redux-thunk";



const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
});

const initialState = {
  products: {},
};



const middleware = [thunk];
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
