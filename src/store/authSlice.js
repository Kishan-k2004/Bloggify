import { createSlice } from "@reduxjs/toolkit";


export const AuthSlice = createSlice({
    name : 'authentication',
    initialState : {status : false, data : null, profileImage : null},
    reducers : {
        Login : (state,action)=>{
            state.status = true
            state.data = action.payload
        },

        Logout : (state)=>{
            state.status = false
            state.data = null
            state.profileImage = null
        },

        UpdateProfile : (state,action)=>{
            state.profileImage = action.payload
        }

    }
})


export const {Login,Logout,UpdateProfile} = AuthSlice.actions
export default AuthSlice.reducer