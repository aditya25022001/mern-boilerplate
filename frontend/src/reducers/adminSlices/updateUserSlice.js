import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const apiBaseURL = "https://server-for-mern-boilerplate.herokuapp.com"

export const updateUserAction = createAsyncThunk(
    "admin/updateUser",
    async({ id, isAdmin }, { rejectWithValue, getState }) => {
        const { userLogin : { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        try {
            const { data } = await axios.put(`${apiBaseURL}/api/admin/update`,{ id, isAdmin}, config)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const resetStateUpdate = createAsyncThunk(
    "admin/resetUpdate",
    async(id) => {
        console.log(id)
    }
)

export const updateUserSlice = createSlice({
    name:"updateUser",
    initialState:{
        loading:false,
        error:null,
        success:false
    },
    extraReducers:{
        [updateUserAction.pending]:(state) => {
            state.loading=true
        },
        [updateUserAction.fulfilled]:(state) => {
            state.loading=false
            state.success=true
        },
        [updateUserAction.rejected]:(state, action) => {
            state.loading=false
            state.error=action.payload.message
        },
        [resetStateUpdate.fulfilled]:(state) => {
            state.success=false
            state.loading=false
            state.error=null
        },
    }
})

export default updateUserSlice.reducer