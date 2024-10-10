// This action tells Redux to add an item to the cart
export const addToCart = (item) => {
   return {
     type: 'ADD_TO_CART',
     payload: { item },
   };
 };
 
 // This action tells Redux to remove an item from the cart
 export const removeFromCart = (id) => {
   return {
     type: 'REMOVE_FROM_CART',
     payload: { id },
   };
 };