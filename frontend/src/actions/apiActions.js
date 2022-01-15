import { GET_API_ENDPOINTS_REQUEST, GET_API_ENDPOINTS_SUCCESS, GET_API_ENDPOINTS_FAIL, ADD_API_ENDPOINT_REQUEST, ADD_API_ENDPOINT_SUCCESS, ADD_API_ENDPOINT_FAIL, EDIT_API_ENDPOINT_REQUEST, EDIT_API_ENDPOINT_SUCCESS, EDIT_API_ENDPOINT_FAIL, DELETE_API_ENDPOINT_REQUEST, DELETE_API_ENDPOINT_SUCCESS, DELETE_API_ENDPOINT_FAIL } from '../constants/apiConstants'
import axios from 'axios'

const apiBaseURL = "https://server-for-mern-boilerplate.herokuapp.com"

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