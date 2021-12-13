import { ADMIN_GET_ALL_USERS_REQUEST, ADMIN_GET_ALL_USERS_SUCCESS, ADMIN_GET_ALL_USERS_FAIL, ADMIN_DELETE_USER_REQUEST, ADMIN_DELETE_USER_SUCCESS, ADMIN_DELETE_USER_FAIL, ADMIN_UPDATE_USER_REQUEST, ADMIN_UPDATE_USER_SUCCESS, ADMIN_UPDATE_USER_FAIL, ADMIN_UPDATE_USER_RESET } from "../constants/adminConstants";
import axios from 'axios'

const apiBaseURL = process.env.REACT_APP_SERVER

export const getAllUsersAction = () => async(dispatch,getState) => {
    try {
        dispatch({
            type: ADMIN_GET_ALL_USERS_REQUEST
        })
        const { userLogin : { userInfo } } = getState()
        const config = {
            headers:{
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`${apiBaseURL}/api/admin/users`,config)
        dispatch({
            type: ADMIN_GET_ALL_USERS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: ADMIN_GET_ALL_USERS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteUserAction = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type:ADMIN_DELETE_USER_REQUEST,
        })
        const { userLogin : { userInfo } } = getState()
        const config = {
            headers:{
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.delete(`${apiBaseURL}/api/admin/delete/${id}`,config)
        dispatch({
            type:ADMIN_DELETE_USER_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ADMIN_DELETE_USER_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateUserAction = (id,name,email,isAdmin) => async(dispatch, getState) => {
    try {
        dispatch({
            type:ADMIN_UPDATE_USER_REQUEST
        })
        const { userLogin : { userInfo } } = getState()
        const config = {
            headers:{
                'Authorization':`Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`${apiBaseURL}/api/admin/update`,{ id, name, email, isAdmin}, config)
        dispatch({
            type:ADMIN_UPDATE_USER_SUCCESS,
            payload:data
        })
        setTimeout(() => {
            dispatch({
                type:ADMIN_UPDATE_USER_RESET
            })
        },3000)
    } catch (error) {
        dispatch({
            type:ADMIN_UPDATE_USER_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}