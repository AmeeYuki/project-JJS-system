import { userApi } from "../services/userManagementAPi"; //user them API test
import { classApi } from "../services/classApi"; //user them API test
import { classProgramApi } from "../services/classProgramApi";
import { userPermissonApi } from "../services/userPermission";
import { authApi } from "../services/AuthApi";

import { programApi } from "../services/programApi";
import { materialApi } from "../services/materialApi";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// ...import { persistStore, persistReducer } from 'redux-persist';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Sử dụng localStorage
import authReducer from "../slices/auth.slice";
import userReducer from "../slices/user.slice";
import userPermissonReducer from "../slices/userpermisson.slice";
import materialReducer from "../slices/material.slice";
import { viewSyllabusApi } from "../services/viewSyllabusApi";
import classReducer from "../slices/class.slice";
import classProgramReducer from "../slices/classProgram.slice";
import programReducer from "../slices/program.slice";
import syllabusSlice from "../slices/syllabus.slice";
import { syllabusdetailApi } from "../services/syllabusDetailApi";

import syllabus_detailSlice from "../slices/syllabus_detail.slice";

const persistConfig = {
  key: "root",
  storage,
};
// Define the Reducers that will always be present in the application
const staticReducers = {
  theme: "theme",
};
const persistedUserReducer = persistReducer(persistConfig, userReducer); //user them API test
const persistedAuthReducer = persistReducer(persistConfig, authReducer); //user them API test

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer, // Fix here //user them API test
    [userPermissonApi.reducerPath]: userPermissonApi.reducer, // Fix here //user them API test
    [classApi.reducerPath]: classApi.reducer,
    [viewSyllabusApi.reducerPath]: viewSyllabusApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [classProgramApi.reducerPath]: classProgramApi.reducer,
    [programApi.reducerPath]: programApi.reducer,
    [materialApi.reducerPath]: materialApi.reducer,
    [syllabusdetailApi.reducerPath]: syllabusdetailApi.reducer,

    auth: persistedAuthReducer,
    user: persistedUserReducer,
    classProgram: classProgramReducer,
    SyllabusDetailSlice: syllabus_detailSlice,
    syllabus: syllabusSlice,
    userpermisson: userPermissonReducer,
    class: classReducer,
    program: programReducer,
    material: materialReducer,
    ...staticReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      classProgramApi.middleware,
      authApi.middleware,
      userApi.middleware,
      userPermissonApi.middleware,
      classApi.middleware,
      viewSyllabusApi.middleware,
      programApi.middleware,
      syllabusdetailApi.middleware,
      materialApi.middleware
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
