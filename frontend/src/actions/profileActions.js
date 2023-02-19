import { USER_GET_PROFILE_REQUEST, USER_GET_PROFILE_SUCCESS, USER_GET_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET, USER_UPLOAD_PROFILE_REQUEST, USER_UPLOAD_PROFILE_SUCCESS, USER_UPLOAD_PROFILE_FAIL, USER_UPLOAD_PROFILE_RESET } from '../constants/profileConstants'
import axios from 'axios'

const apiBaseURL = "https://server-for-mern-boilerplate.onrender.com"

export const getProfileAction = () => async(dispatch, getState) => {
    try {
        dispatch({
            type:USER_GET_PROFILE_REQUEST
        })
        const { userLogin : { userInfo } } = getState()
        const config = {
            headers:{
                'Authorization':`Bearer ${userInfo.token}`,
                'Content-Type':'application/json'
            }
        }
        const { data } = await axios.get(`${apiBaseURL}/api/profile`,config)
        dispatch({
            type:USER_GET_PROFILE_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:USER_GET_PROFILE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message

        }) 
    }
}

export const updateProfileAction = (name) => async(dispatch,getState) => {
    try {
        dispatch({
            type:USER_UPDATE_PROFILE_REQUEST
        })
        const { userLogin : { userInfo } } = getState()
        const config = {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`${apiBaseURL}/api/profile/update`, { name }, config)
        dispatch({
            type:USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })
        setTimeout(() => {
            dispatch({
                type:USER_UPDATE_PROFILE_RESET
            })
        },3000)
    } catch (error) {
        dispatch({
            type:USER_UPDATE_PROFILE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const uploadProfileAction = (url) => async(dispatch, getState) => {
    try {
        dispatch({
            type:USER_UPLOAD_PROFILE_REQUEST
        })
        const { userLogin : { userInfo } } = getState()
        const config = {
            headers:{
                'Authorization': `Bearer ${userInfo.token}`,
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`${apiBaseURL}/api/profile/upload`,{ url }, config)
        dispatch({
            type:USER_UPLOAD_PROFILE_SUCCESS,
            payload:data
        })
        setTimeout(() => {
            dispatch({
                type:USER_UPLOAD_PROFILE_RESET
            })
        },2500)
    } catch (error) {
        dispatch({
            type:USER_UPLOAD_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}