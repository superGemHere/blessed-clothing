// Initial (starting) state of the cart
const initialState = {
   items: [],       // This will store the items added to the cart
   totalAmount: 0   // This stores the total cost of the cart
 };
 
 // Define the cartReducer (rulebook)
 export const cartReducer = (state = initialState, action) => {
   switch (action.type) {
     case 'ADD_TO_CART':
       // When an item is added to the cart
       const updatedItems = [...state.items, action.payload.item];
       const updatedTotalAmount = state.totalAmount + action.payload.item.price;
       return {
         ...state,
         items: updatedItems,
         totalAmount: updatedTotalAmount,
       };
 
     case 'REMOVE_FROM_CART':
       // When an item is removed from the cart
       const filteredItems = state.items.filter(item => item.id !== action.payload.id);
       const itemToRemove = state.items.find(item => item.id === action.payload.id);
       const newTotalAmount = state.totalAmount - itemToRemove.price;
       return {
         ...state,
         items: filteredItems,
         totalAmount: newTotalAmount,
       };
 
     default:
       return state; // If no action matches, just return the current state
   }
 };