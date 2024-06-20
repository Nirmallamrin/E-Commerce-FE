import { combineReducers } from "redux";
import cartReducer from "./CartReducers";

const RootReducer = combineReducers({
  cart: cartReducer,
});

export default RootReducer;
