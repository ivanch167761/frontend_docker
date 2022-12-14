
import * as pdConstants from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case pdConstants.PRODUCT_LIST_REQUEST:
      return { loading: true, ...state };
    case pdConstants.PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case pdConstants.PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};



export const productDetailsReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case pdConstants.PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case pdConstants.PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case pdConstants.PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
