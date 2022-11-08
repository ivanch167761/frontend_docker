import * as pdConstants from "../constants/productConstants";
import axios from "axios"


export const listProduct = () => async (dispatch) => {
  try {
    dispatch({ type: pdConstants.PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("http://134.209.135.168:80/api/products");
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
    console.log(`http://134.209.135.168:80/api/products/${id}`);
    const { data } = await axios.get(`http://134.209.135.168:80/api/products/${id}`);
    console.log(data);
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
