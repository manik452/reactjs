import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
/*import LoginReducer from './reducers/LoginReducer';*/
import authReducer from "../features/auth/authSlice";
const ConfigureStore = () => {
    var intialState = { user: null, accessToken: null, refreshToken: null, roles: null };
    try {
        intialState = sessionStorage.getItem("master_class") ? JSON.parse(sessionStorage.getItem("master_class")) : {};
    } catch (error) {
        console.log('getError', error)
    }
    const saver = (store) => next => action => {
        let stateToSave = store.getState();
        sessionStorage.setItem("master_class", JSON.stringify({ ...stateToSave }))
        return next(action);
    }

    const appReducer = combineReducers({
        auth: authReducer,
    });
    const rootReducer = (state, action) => {
        if (action.type == 'USER_LOGOUT') {
            sessionStorage.removeItem("master_class");
            
            return appReducer(undefined, action)
        }
        return appReducer(state, action)
    };
    const middleware = [thunk, saver, logger];
    return createStore(rootReducer, intialState, applyMiddleware(...middleware));
}

export default ConfigureStore;