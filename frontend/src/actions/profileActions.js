import { USER_GET_PROFILE_REQUEST, USER_GET_PROFILE_SUCCESS, USER_GET_PROFILE_FAIL } from '../constants/profileConstants'
import axios from 'axios'

const apiBaseURL = process.env.REACT_APP_SERVER

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