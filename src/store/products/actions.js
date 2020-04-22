import axios from "axios";
import { apiUrl } from "../../config/constants";

import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

const allProductsFetched = (products) => {
  return {
    type: "FETCH_ALL_PRODUCTS",
    payload: products,
  };
};

export const fetchAllProducts = () => {
  return async (dispatch, getState) => {
    dispatch(appLoading);
    try {
      const response = await axios.get(`${apiUrl}/products`);
      dispatch(allProductsFetched(response.data));
      console.log(response.data);
    } catch (e) {
      console.log(e.message);
    }
    dispatch(appDoneLoading);
  };
};
