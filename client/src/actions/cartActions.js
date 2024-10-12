// This action tells Redux to add an item to the cart
export const addToCart = (item) => {
  return {
    type: 'ADD_TO_CART',
    payload: { item: { ...item, quantity: item.quantity || 1 } },  // Ensure quantity is at least 1
  };
};

// This action tells Redux to remove an item from the cart
export const removeFromCart = (id) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: { id },
  };
};

// This action tells Redux to update the quantity of an item in the cart
export const updateCartItemQuantity = (productId, quantity) => {
  return {
    type: 'UPDATE_CART_ITEM_QUANTITY',
    payload: { productId, quantity },
  };
};
