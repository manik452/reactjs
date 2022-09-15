import  configureStore  from "./ConfigureStore";
import { apiSlice } from "./api/apiSlice";
import authReducer from "../features/auth/authSlice";

import thunkMiddleware from 'redux-thunk'
/*import { configureStore } from '@reduxjs/toolkit'*/

/**/
/*auth: authReducer*/

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store;
/*
 import rootReducer from "./locationSlice";
const store = configureStore({
    reducer: rootReducer
});
 */