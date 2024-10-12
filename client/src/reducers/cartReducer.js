// Initial (starting) state of the cart
const initialState = {
  items: [],       // This will store the items added to the cart
  totalAmount: 0   // This stores the total cost of the cart
};

// Define the cartReducer (rulebook)
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Check if the item is already in the cart
      const existingCartItemIndex = state.items.findIndex(item => item._id === action.payload.item._id);
      const existingCartItem = state.items[existingCartItemIndex];
      
      let updatedItems;
      
      if (existingCartItem) {
        // If item exists, update its quantity
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + action.payload.item.quantity
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        // If item doesn't exist, add it to the cart
        updatedItems = [...state.items, { ...action.payload.item, quantity: action.payload.item.quantity }];
      }
      
      const updatedTotalAmount = updatedItems.reduce((sum, item) => sum + item.newPrice * item.quantity, 0);
      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };

    case 'REMOVE_FROM_CART':
      // Remove an item from the cart
      const itemToRemove = state.items.find(item => item._id === action.payload._id);
      
      if (!itemToRemove) return state; // If item doesn't exist in the cart, do nothing

      const filteredItems = state.items.filter(item => item._id !== action.payload._id);
      const newTotalAmount = state.totalAmount - itemToRemove.newPrice * itemToRemove.quantity;
      return {
        ...state,
        items: filteredItems,
        totalAmount: newTotalAmount,
      };

    case 'UPDATE_CART_ITEM_QUANTITY':
      // Update the quantity of an item in the cart
      const itemIndex = state.items.findIndex(item => item._id === action.payload.productId);
      if (itemIndex !== -1) {
        const updatedItem = {
          ...state.items[itemIndex],
          quantity: action.payload.quantity
        };
        
        const updatedItemsList = [...state.items];
        updatedItemsList[itemIndex] = updatedItem;
        
        const recalculatedTotalAmount = updatedItemsList.reduce((sum, item) => sum + item.newPrice * item.quantity, 0);
        
        return {
          ...state,
          items: updatedItemsList,
          totalAmount: recalculatedTotalAmount
        };
      }
      return state;

    default:
      return state; // If no action matches, just return the current state
  }
};
