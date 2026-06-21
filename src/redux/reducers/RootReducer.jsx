import { combineReducers } from "redux";
import cartReducer from "./CartReducers";
import wishlistReducer from "./WishlistReducers";

const RootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
});

export default RootReducer;
