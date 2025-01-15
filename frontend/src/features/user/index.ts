import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        address: {},
        id: '',
        name: '',
        email: '',
        role: '',
        isLoggedIn: false
    },
    reducers: {
        setUser: (state, action) => {
            state.address = action.payload.address;
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.isLoggedIn = true;
        },
        setLogout: (state) => {
            state.address = {};
            state.id = '';
            state.name = '';
            state.email = '';
            state.role = '';
            state.isLoggedIn = false;
        }
    }
})

export const selectUser = (state: any) => state.user;
export const { setUser,setLogout } = userSlice.actions;
export default userSlice.reducer;
