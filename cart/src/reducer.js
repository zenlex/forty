const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "CHANGE_QTY": {
      let tempCart = [];
      tempCart = state.cart
        .map((item) => {
          if (item.id === action.payload) {
            return { ...item, amount: item.amount + action.change };
          }
          return item;
        })
        .filter((item) => item.amount > 0);
      return {
        ...state,
        cart: tempCart,
      };
    }

    case "UPDATE_TOTALS": {
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemTotal = price * amount;
          cartTotal.amount += amount;
          cartTotal.total += itemTotal;
          return cartTotal;
        },
        { total: 0, amount: 0 }
      );
      total = Number.parseFloat(total.toFixed(2));
      return { ...state, total, amount };
    }

    case "LOADING":
      return { ...state, loading: true };

    case "DISPLAY_ITEMS":
      return { ...state, cart: action.payload, loading: false };
    default:
      throw new Error("no matching action type");
  }
};

export default reducer;
