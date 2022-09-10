export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUserName(state, action: PayloadAction<AppState["username"]>) {
            state.username = action.payload;
        },
        updatePassword(state, action: PayloadAction<AppState["password"]>) {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                login.fulfilled,
                (state, action: PayloadAction<AppState["user"]>) => {
                    localStorage.setItem("user", JSON.stringify(action.payload));
                    state.user = action.payload;
                }
            )
            .addCase(logout.fulfilled, (state) => {
                localStorage.removeItem("user");
                state.user = null;
                state.username = "";
                state.password = "";
                state.success = false;
                state.error = false;
            })
            .addCase(deleteUser.pending, (state) => {
                state.success = false;
                state.error = false;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.success = true;
            })
            .addCase(deleteUser.rejected, (state) => {
                state.error = true;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                localStorage.setItem("user", JSON.stringify(action.payload));
                state.user = action.payload as AppState["user"];
            });
    },
});