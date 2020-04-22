const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ALL_PRODUCTS":
      return [...action.payload];

    default:
      return state;
  }
};
