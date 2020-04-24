const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ALL_PRODUCTS":
      return [...state, ...action.payload];

    default:
      return state;
  }
};
