import React, { useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const remove = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const changeQty = (id, change) => {
    dispatch({ type: "CHANGE_QTY", payload: id, change: change });
  };

  useEffect(() => {
    dispatch({ type: "UPDATE_TOTALS" });
  }, [state.cart]);

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: "LOADING" });
      const response = await fetch(url);
      const cart = await response.json();
      dispatch({ type: "DISPLAY_ITEMS", payload: cart });
    }
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        changeQty,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
