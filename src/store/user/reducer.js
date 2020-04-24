import {
  LOG_OUT,
  LOGIN_SUCCESS,
  TOKEN_STILL_VALID,
  ADD_PRODUCT_TO_CART,
} from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  cart: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    case ADD_PRODUCT_TO_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          Cart_Products: [...state.cart.Cart_Products, action.payload],
        },
      };
    default:
      return state;
  }
};
