import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage (localStorage for web)
import { cartReducer } from './reducers/cartReducer';

// Configure Redux Persist
const persistConfig = {
  key: 'root',     // Key for the persisted data in storage
  storage,         // Type of storage (localStorage by default)
};

// Combine all reducers
const rootReducer = combineReducers({
  cart: cartReducer,
});

// Wrap rootReducer with persistReducer to enable persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store using persistedReducer
const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Create a persistor to control the persistence
export const persistor = persistStore(store);
export default store;
