import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiBaseURL = "https://server-for-mern-boilerplate.onrender.com"

export const uploadProfileAction = createAsyncThunk(
    "user/uploadProfilePic",
    async({url},{rejectWithValue, getState}) => {
        const { userLogin : { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        try {
            const { data } = await axios.post(`${apiBaseURL}/api/profile/upload`,{ url }, config)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const resetStateUpload = createAsyncThunk(
    "user/resetUpload",
    async(id) => {
        console.log(id)
    }
) 

const uploadProfileSlice = createSlice({
    name:"uploadProfilePic",
    initialState:{
        loading:false,
        error:null,
        success:false
    },
    extraReducers:{
        [uploadProfileAction.pending]:(state) => {
            state.loading=true
        },
        [uploadProfileAction.fulfilled]:(state) => {
            state.loading=false
            state.success=true
        },
        [uploadProfileAction.rejected]:(state,action) => {
            state.loading=false
            state.error=action.payload.message
        },
        [resetStateUpload.fulfilled]:(state) => {
            state.loading=false
            state.error=null
            state.success=false
        }
    }
})

export default uploadProfileSlice.reducer