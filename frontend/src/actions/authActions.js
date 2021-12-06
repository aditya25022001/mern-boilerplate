import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT } from '../constants/authConstants'
import axios from 'axios'

const apiBaseURL = process.env.REACT_APP_SERVER

export const userRegisterAction = (name, email, password) => async(dispatch) => {
    try {
        dispatch({
            type:USER_REGISTER_REQUEST
        })
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`${apiBaseURL}/api/auth/register`,{ name, email, password },config)
        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload: data
        })
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        }) 
        sessionStorage.setItem("userInfo",JSON.stringify(data))
    } catch (error) {
        dispatch({
            type:USER_REGISTER_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message

        })        
    }
}

export const userLoginAction = (email, password) => async(dispatch) => {
    try {
        dispatch({
            type:USER_LOGIN_REQUEST
        })
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`${apiBaseURL}/api/auth/login`,{ email, password },config)
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload: data
        })
        sessionStorage.setItem("userInfo",JSON.stringify(data))
    } catch (error) {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message

        })        
    }
}

export const userLogoutAction = () => async(dispatch) => {
    dispatch({
        type:USER_LOGOUT
    })
    sessionStorage.removeItem("userInfo")
}
