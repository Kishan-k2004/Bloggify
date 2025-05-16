import { createSlice } from "@reduxjs/toolkit";


export const AuthSlice = createSlice({
    name : 'authentication',
    initialState : {status : false, data : null},
    reducers : {
        Login : (state,action)=>{
            state.status = true
            state.data = action.payload
        },

        Logout : (state)=>{
            state.status = false
            state.data = null
        }

    }
})


export const {Login,Logout} = AuthSlice.actions
export default AuthSlice.reducer