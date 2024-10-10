import { createStore, combineReducers } from 'redux';
import { cartReducer } from './reducers/cartReducer';

// Combine all reducers (for now we just have one reducer: cartReducer)
const rootReducer = combineReducers({
  cart: cartReducer,  // This will handle everything related to the cart
});

// Create the Redux store
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Enables debugging
);

export default store;