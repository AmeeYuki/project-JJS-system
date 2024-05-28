import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Sử dụng localStorage
// import { flowerApi } from "../services/flowerApi";
// import flowerReducer from "../slices/flower.slice";
import userReducer from "../slices/user.slice";
import productReducer from "../slices/product.slice";
import counterReducer from "../slices/counter.slice";
import { userAPI } from "../services/userAPI";
import authReducer from "../slices/auth.slice";
import { authApi } from "../services/authAPI";
import { productAPI } from "../services/productAPI";
import { counterAPI } from "../services/counterAPI";

const persistConfig = {
  key: "root",
  storage,
};
// Define the Reducers that will always be present in the application
const staticReducers = {
  theme: "theme",
};

// const persistedReducer = persistReducer(persistConfig, flowerReducer);
const persistedAuthReducer = persistReducer(persistConfig, authReducer); //user them API test
const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    // [flowerApi.reducerPath]: flowerApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [counterAPI.reducerPath]: counterAPI.reducer,

    // flower: persistedReducer,
    auth: persistedAuthReducer,
    user: persistedUserReducer,
    product: productReducer,
    counter: counterReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(flowerApi.middleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      // flowerApi.middleware,
      userAPI.middleware,
      productAPI.middleware,
      counterAPI.middleware
    ), //user them API test
});

// Add a dictionary to keep track of the registered async reducers
store.asyncReducers = {};

// Create an inject reducer function
// This function adds the async reducer, and creates a new combined reducer
export const injectReducer = (key, asyncReducer) => {
  store.asyncReducers[key] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  return asyncReducer;
};

function createReducer(asyncReducers = {}) {
  if (Object.keys(asyncReducers).length === 0) {
    return (state) => state;
  } else {
    return combineReducers({
      ...staticReducers,
      ...asyncReducers,
    });
  }
}

export const Persister = persistStore(store);
