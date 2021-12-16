import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiBaseURL = "https://server-for-mern-boilerplate.herokuapp.com"

export const deleteUserAction = createAsyncThunk(
    "admin/deleteUser",
    async({ id },{ rejectWithValue, getState }) => {
        const { userLogin : { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        try {
            const { data } = await axios.delete(`${apiBaseURL}/api/admin/delete/${id}`,config)
            return data  
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const resetStateDelete = createAsyncThunk(
    "admin/resetDelete",
    async(id) => {
        console.log(id)
    }
)

const deleteUserSlice = createSlice({
    name:"deleteUser",
    initialState:{
        loading:false,
        error:null,
        success:false
    },
    extraReducers:{
        [deleteUserAction.pending]:(state) => {
            state.loading=true
        },
        [deleteUserAction.fulfilled]:(state) => {
            state.loading=false
            state.success=true
        },
        [deleteUserAction.rejected]:(state, action) => {
            state.loading=false
            state.error=action.payload.message
        },
        [resetStateDelete.fulfilled]:(state) => {
            state.success=false
            state.loading=false
            state.error=null
        },
    }
})

export default deleteUserSlice.reducer