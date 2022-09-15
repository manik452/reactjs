/*import { createSlice } from "@reduxjs/toolkit"
import { Accordion } from "react-bootstrap";

const cartSlice = createSlice({
    name: 'cart',
    initialState: { id: null, image: null, name: null, price: null, rating: null },
    reducers: {
        setCredentials: (state, action) => {
            const { user, password, accessToken, refreshToken, roles } = action.payload

            console.log(action.payload);
            state.user = user
            state.password = password
            state.accessToken = accessToken
            state.refreshToken = refreshToken
            state.roles = roles
            console.log("Set Credentials " + user + password + accessToken + refreshToken + roles)

        },
        logOut: (state, action) => {
            state.user = null
            state.password = null
            state.accessToken = null
            state.refreshToken = null
            state.roles = null
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default cartSlice.reducer

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentAccessToken = (state) => state.auth.accessToken;
export const selectCurrentRoles = (state) => state.auth.roles;
*//*export const selectCurrentAccessToken = (state) => state.auth.accessToken*//*
*//*export const selectCurrentRefreshToken = (state) => state.auth.refreshToken   state.auth.accessToken*/