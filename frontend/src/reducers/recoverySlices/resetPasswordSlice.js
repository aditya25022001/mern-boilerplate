import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const apiBaseURL = "https://server-for-mern-boilerplate.onrender.com"

export const resetPasswordAction = createAsyncThunk(
    "user/resetPassword",
    async({password,id},{rejectWithValue}) => {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        try {
            const { data } = await axios.put(`${apiBaseURL}/api/recovery/reset`,{ password, id },config)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const resetStatePassword = createAsyncThunk(
    "user/resetStatePassword",
    async(id) => {
        console.log(id)
    }
)

const resetPasswordSlice = createSlice({
    name:"resetPassword",
    initialState:{
        loading:false,
        error:null,
        success:false
    },
    extraReducers:{
        [resetPasswordAction.pending]:(state) => {
            state.loading=true
        },
        [resetPasswordAction.fulfilled]:(state) => {
            state.loading=false
            state.success=true
        },
        [resetPasswordAction.rejected]:(state,action) => {
            state.loading=false
            state.error=action.payload.message
        },
        [resetStatePassword.fulfilled]:(state) => {
            state.loading=false
            state.error=null
            state.succes=false
        }
    }
})

export default resetPasswordSlice.reducer