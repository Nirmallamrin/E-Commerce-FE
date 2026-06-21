const wishlistReducer = (state = {wishlistItems: []}, action) => {
    switch (action.type) {
        case "SET_WISHLIST":
            return {
                ...state,
                wishlistItems: action.payload,
            };
        case "ADD_TO_WISHLIST":
            const item = action.payload;
            const existItem = state.wishlistItems.find((x) => x._id === item._id);
            if (existItem) {
                return state;
            } else {
                return {
                    ...state,
                    wishlistItems: [...state.wishlistItems, item],
                };
            }
        case "REMOVE_FROM_WISHLIST":
            return {
                ...state,
                wishlistItems: state.wishlistItems.filter((x) => x._id !== action.payload._id),
            };
        default:
            return state;
    }
}

export default wishlistReducer;
