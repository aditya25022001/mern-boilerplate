import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiBaseURL = "https://server-for-mern-boilerplate.onrender.com"

export const makeContactAction = createAsyncThunk(
    "user/makeContact",
    async({name, email, message},{rejectWithValue}) => {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        try {
            const { data } = await axios.post(`${apiBaseURL}/api/contact`,{ name, email, message }, config)
            return data.message
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

const contactSlice = createSlice({
    name:"userContact",
    initialState:{
        loading:false,
        error:null,
        message:null
    },
    extraReducers:{
        [makeContactAction.pending]:(state) => {
            state.loading=true
        },
        [makeContactAction.fulfilled]:(state, action) => {
            state.loading=false
            state.message=action.payload
        },
        [makeContactAction.rejected]:(state, action) => {
            state.loading=false
            state.error=action.payload.message    
        },
    }
})

export default contactSlice.reducer