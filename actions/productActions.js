import * as pdConstants from "../constants/productConstants";
import axios from "axios"


export const listProduct = () => async (dispatch) => {
  try {
    dispatch({ type: pdConstants.PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("http://localhost:555/api/products");
    dispatch({
      type: pdConstants.PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: pdConstants.PRODUCT_LIST_FAIL,
      payload:"error"
    });
  }
};

export const listProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: pdConstants.PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`http://localhost:555/api/products/${id}`);
    dispatch({
      type: pdConstants.PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: pdConstants.PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
