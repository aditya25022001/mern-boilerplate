import { GET_API_ENDPOINTS_REQUEST, GET_API_ENDPOINTS_SUCCESS, GET_API_ENDPOINTS_FAIL, ADD_API_ENDPOINT_REQUEST, ADD_API_ENDPOINT_SUCCESS, ADD_API_ENDPOINT_FAIL, EDIT_API_ENDPOINT_REQUEST, EDIT_API_ENDPOINT_SUCCESS, EDIT_API_ENDPOINT_FAIL, DELETE_API_ENDPOINT_REQUEST, DELETE_API_ENDPOINT_SUCCESS, DELETE_API_ENDPOINT_FAIL } from '../constants/apiConstants'

export const getApiEndpointsReducer = (state={endpoints:[]},action) => {
    switch(action.type){
        case GET_API_ENDPOINTS_REQUEST:
            return{
                loading:true
            }
        case GET_API_ENDPOINTS_SUCCESS:
            return{
                loading:false,
                endpoints:action.payload
            }
        case GET_API_ENDPOINTS_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        default: 
            return state
    }
}

export const addApiReducer = (state={},action) => {
    switch(action.type){
        case ADD_API_ENDPOINT_REQUEST:
            return{
                loading:true
            }
        case ADD_API_ENDPOINT_SUCCESS:
            return{
                loading:false,
                success:true
            }
        case ADD_API_ENDPOINT_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}

export const editApiReducer = (state={},action) => {
    switch(action.type){
        case EDIT_API_ENDPOINT_REQUEST:
            return{
                loading:true
            }
        case EDIT_API_ENDPOINT_SUCCESS:
            return{
                loading:false,
                success:true
            }
        case EDIT_API_ENDPOINT_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}

export const deleteApiReducer = (state={},action) => {
    switch(action.type){
        case DELETE_API_ENDPOINT_REQUEST:
            return{
                loading:true
            }
        case DELETE_API_ENDPOINT_SUCCESS:
            return{
                loading:false,
                success:true
            }
        case DELETE_API_ENDPOINT_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}