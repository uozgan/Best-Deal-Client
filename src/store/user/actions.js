import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken, selectCart, selectUser } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";
import { selectAllProducts } from "../products/selectors";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        name,
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

export const fetchCartProductsByCartId = (cartId) => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    try {
      const response = await axios.get(`${apiUrl}/get_best_prices/${cartId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Response", response.data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
// export const REMOVE_CAR_FROM_CART = "REMOVE_CAR_FROM_CART";
// export const CLEAR_CART = "CLEAR_CART";

export const addToCart = (cartProduct) => {
  return (dispatch) => {
    console.log("Prodcut added!");
    dispatch({
      type: ADD_PRODUCT_TO_CART,
      payload: cartProduct,
    });
  };
};

// export const removeCarFromCart = (id) => {
//   return (dispatch) => {
//     dispatch({
//       type: REMOVE_CAR_FROM_CART,
//       payload: id,
//     });
//   };
// };

export const addProductToCart = (id) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const { cart, token } = selectUser(getState());

    console.log("Cartzz", cart);

    const response = await axios.post(
      `${apiUrl}/products/${id}`,
      {
        productId: id,
        cartId: cart.id,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Response Cart add", response.data);
    console.log("data.cartProduct", response.data.cartProduct);

    dispatch(addToCart(response.data.cartProduct));
    dispatch(appDoneLoading());
  };
};

// export const emptyCart = () => {
//   return {
//     type: CLEAR_CART
//   }
// }
