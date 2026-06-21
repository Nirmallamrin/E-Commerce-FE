export const setWishlist = (products) => {
    return {
        type: "SET_WISHLIST",
        payload: products
    }
}

export const addToWishlist = (product) => {
    return {
        type: "ADD_TO_WISHLIST",
        payload: product
    }
}

export const removeFromWishlist = (product) => {
    return {
        type: "REMOVE_FROM_WISHLIST",
        payload: product
    }
}
