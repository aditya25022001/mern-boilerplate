import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiBaseURL = "https://server-for-mern-boilerplate.herokuapp.com"

export const forgotPasswordAction = createAsyncThunk(
    "user/sendOTP",
    async({email},{rejectWithValue}) => {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        try {
            const { data } = await axios.post(`${apiBaseURL}/api/recovery/sendOTP`,{ email },config)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const resetStateSendOtp = createAsyncThunk(
    "user/resetUpdateOTP",
    async(id) => {
        console.log(id)
    }
) 

const sendOtpSlice = createSlice({
    name:"sendOTP",
    initialState:{
        loading:false,
        error:null,
        success:false,
        otpDetails:null
    },
    extraReducers:{
        [forgotPasswordAction.pending]:(state) => {
            state.loading=true
        },
        [forgotPasswordAction.fulfilled]:(state, action) => {
            state.loading=false
            state.otpDetails=action.payload
            state.success=true
        },
        [forgotPasswordAction.rejected]:(state, action) => {
            state.loading=false
            state.error=action.payload.message
        },
        [resetStateSendOtp.fulfilled]:(state) => {
            state.loading=false
            state.error=null
            state.success=false
            state.otpDetails=null
        }
    }
})

export default sendOtpSlice.reducer