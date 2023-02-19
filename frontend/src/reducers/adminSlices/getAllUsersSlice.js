import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const apiBaseURL = "https://server-for-mern-boilerplate.onrender.com"

export const getAllUsersAction = createAsyncThunk(
    "admin/getUsers",
    async(id,{rejectWithValue, getState}) => {
        const { userLogin : { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        try {
            const { data } = await axios.get(`${apiBaseURL}/api/admin/users`,config)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const getUsersSlice = createSlice({
    name:"getUsers",
    initialState:{
        loading:false,
        error:null,
        users:[]
    },
    extraReducers:{
        [getAllUsersAction.pending]:(state) => {
            state.loading=true
        },
        [getAllUsersAction.fulfilled]:(state, action) => {
            state.loading=false
            state.users=action.payload.users
        },
        [getAllUsersAction.rejected]:(state, action) => {
            state.loading=false
            state.error=action.payload.message
        }
    }
})

export default getUsersSlice.reducer