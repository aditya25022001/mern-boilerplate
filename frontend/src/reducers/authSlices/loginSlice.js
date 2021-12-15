import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiBaseURL = "https://server-for-mern-boilerplate.herokuapp.com"

export const userLoginAction = createAsyncThunk(
    'user/login',
    async ({email, password},{ rejectWithValue }) => {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        try {
            const { data } = await axios.post(`${apiBaseURL}/api/auth/login`,{ email, password }, config)
            sessionStorage.setItem("userInfo",JSON.stringify(data))
            return data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const userLogoutAction = createAsyncThunk(
    'user/logout',
    async () => {
        sessionStorage.removeItem('userInfo')
    }
)

export const loginSlice = createSlice({
    name:"userLogin",
    initialState:{
        loading: false,
        error:null,
        userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null
    },
    extraReducers:{
        [userLoginAction.pending]:(state) => {
            state.loading=true
        },
        [userLoginAction.fulfilled]:(state, action) => {
            state.loading=false
            state.userInfo=action.payload
        },
        [userLoginAction.rejected]:(state, action) => {
            state.loading=false
            state.error=action.payload.message    
        },
        [userLogoutAction.pending]:(state) => {
            state.loading=true
        },
        [userLogoutAction.fulfilled]:(state) => {
            state.loading=false
            state.userInfo=null
        },
        [userLogoutAction.rejected]:(state) => {
            state.loading=false
            state.error="Error logging out"
        }
    }
})

export default loginSlice.reducer