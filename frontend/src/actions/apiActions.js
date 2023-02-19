import { GET_API_ENDPOINTS_REQUEST, GET_API_ENDPOINTS_SUCCESS, GET_API_ENDPOINTS_FAIL, ADD_API_ENDPOINT_REQUEST, ADD_API_ENDPOINT_SUCCESS, ADD_API_ENDPOINT_FAIL, EDIT_API_ENDPOINT_REQUEST, EDIT_API_ENDPOINT_SUCCESS, EDIT_API_ENDPOINT_FAIL, DELETE_API_ENDPOINT_REQUEST, DELETE_API_ENDPOINT_SUCCESS, DELETE_API_ENDPOINT_FAIL } from '../constants/apiConstants'
import axios from 'axios'

const apiBaseURL = "https://server-for-mern-boilerplate.onrender.com"

export const getApiEndpointsAction = () => async(dispatch) => {
    try {
        dispatch({
            type:GET_API_ENDPOINTS_REQUEST
        })
        const { data } = await axios.get(`${apiBaseURL}/api/api/get`)
        dispatch({
            type:GET_API_ENDPOINTS_SUCCESS,
            payload: data.apis
        })
    } catch (error) {
        dispatch({
            type: GET_API_ENDPOINTS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })        
    }
}

export const addApiAction = (method,route,parameters,access,description) => async(dispatch,getState) => {
    try {
        dispatch({
            type:ADD_API_ENDPOINT_REQUEST
        })
        const { userLogin : { userInfo } } = getState()
        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`${apiBaseURL}/api/api/add`,{ method,route,parameters,access,description },config)
        dispatch({
            type:ADD_API_ENDPOINT_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ADD_API_ENDPOINT_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })        
    }
}

export const editApiAction = (method,route,parameters,access,description) => async(dispatch,getState) => {
    try {
        dispatch({
            type:EDIT_API_ENDPOINT_REQUEST
        })
        const { userLogin : { userInfo } } = getState()
        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`${apiBaseURL}/api/api/edit`,{ method,route,parameters,access,description },config)
        dispatch({
            type:EDIT_API_ENDPOINT_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:EDIT_API_ENDPOINT_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })        
    }
}

export const deleteApiAction = (id) => async(dispatch,getState) => {
    try {
        dispatch({
            type:DELETE_API_ENDPOINT_REQUEST
        })
        const { userLogin : { userInfo } } = getState()
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.delete(`${apiBaseURL}/api/api/delete/${id}`,config)
        dispatch({
            type:DELETE_API_ENDPOINT_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:DELETE_API_ENDPOINT_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })        
    }
}