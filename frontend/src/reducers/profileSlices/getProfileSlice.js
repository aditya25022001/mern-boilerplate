import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const apiBaseURL = "https://server-for-mern-boilerplate.onrender.com"

export const getProfileAction = createAsyncThunk(
    "user/getProfile",
    async(id,{rejectWithValue, getState}) => {
        const { userLogin : { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        try {
            const { data } = await axios.get(`${apiBaseURL}/api/profile`,config)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data) 
        }
    }
)

const getProfileSlice = createSlice({
    name:"userGetProfile",
    initialState:{
        loading:false,
        error:null,
        profile : null
    },
    extraReducers:{
        [getProfileAction.pending]:(state) => {
            state.loading = true
        },
        [getProfileAction.fulfilled]:(state, action) => {
            state.loading = false
            state.profile = action.payload
        },
        [getProfileAction.rejected]:(state, action) => {
            state.loading = false
            state.error = action.payload.message
        }
    }
})

export default getProfileSlice.reducer