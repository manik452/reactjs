import  configureStore  from "./ConfigureStore";
import { apiSlice } from "./api/apiSlice";
import authReducer from "../features/auth/authSlice";
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware).concat(logger).concat(thunkMiddleware),
    devTools: true
})

export default store;
/*
 import rootReducer from "./locationSlice";
const store = configureStore({
    reducer: rootReducer
});
 */