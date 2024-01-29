import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser : null,
    loading : false,
    error : null,
    token : null,
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        token : (state,action)=>{
            state.token = action.payload;
        },
        signInStart : (state)=>{
            state.loading = true;
        },
        signInSuccess : (state,action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure : (state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        updateUserStart : (state)=>{
            state.loading = true;
        },
        updateUserSuccess : (state,action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
       
        },
        updateUserError : (state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        deleteStart : (state)=>{
            state.loading = true;
        },
        deleteSuccess : (state,)=>{
            state.currentUser = null;
            state.token = null;
            state.loading = false;
            state.error = null;
        },
        deleteFailure : (state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        signOutStart : (state)=>{
            state.loading = true;
        },
        signOutSuccess : (state)=>{
            state.currentUser = null;
            state.token = null;
            state.loading = false;
            state.error = null;
        },
        signOutFailure : (state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },

    }
})

export const {signInFailure,signInSuccess,signInStart, token, showSuccess,deleteFailure,deleteStart,
    deleteSuccess,signOutFailure,signOutStart,signOutSuccess,
                updateUserError,updateUserSuccess,updateUserStart} = userSlice.actions;
export const userReducers = userSlice.reducer;
export const userSelector = (state) => state.user ;
