import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiBaseURL = "https://server-for-mern-boilerplate.herokuapp.com"

export const updateProfileAction = createAsyncThunk(
    "user/updateProfile",
    async({name},{rejectWithValue, getState}) => {
        const { userLogin : { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        try {
            const { data } = await axios.put(`${apiBaseURL}/api/profile/update`, { name }, config)
            return data            
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const resetStateUpdate = createAsyncThunk(
    "user/resetUpdate",
    async(id) => {
        console.log(id)
    }
) 

const updateProfileSlice = createSlice({
    name:"userUpdateProfile",
    initialState:{
        loading:false,
        error:null,
        success:false
    },
    extraReducers:{
        [updateProfileAction.pending]:(state) => {
            state.loading=true
        },
        [updateProfileAction.fulfilled]:(state) => {
            state.loading=false
            state.success=true
        },
        [updateProfileAction.rejected]:(state,action) => {
            state.loading=false
            state.error=action.payload.message
        },
        [resetStateUpdate.fulfilled]:(state) => {
            state.success=false
            state.loading=false
            state.error=null
        }
    }
})

export default updateProfileSlice.reducer