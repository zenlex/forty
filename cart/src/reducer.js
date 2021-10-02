const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case "INCREMENT": {
      let tempCart = [];
      tempCart = state.cart.map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
      return {
        ...state,
        cart: tempCart,
      };
    }

    case "DECREMENT": {
      let tempCart = [];
      tempCart = state.cart
        .map((item) => {
          if (item.id === action.payload) {
            return { ...item, amount: item.amount - 1 };
          }
          return item;
        })
        .filter((item) => item.amount > 0);
      return {
        ...state,
        cart: tempCart,
      };
    }
  }
  return state;
};

export default reducer;
