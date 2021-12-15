import { USER_GET_PROFILE_REQUEST, USER_GET_PROFILE_SUCCESS, USER_GET_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET, USER_UPLOAD_PROFILE_REQUEST, USER_UPLOAD_PROFILE_SUCCESS, USER_UPLOAD_PROFILE_FAIL, USER_UPLOAD_PROFILE_RESET } from '../constants/profileConstants'

export const getProfileReducer = (state={},action) => {
    switch(action.type){
        case USER_GET_PROFILE_REQUEST:
            return{
                loading:true
            }
        case USER_GET_PROFILE_SUCCESS:
            return {
                loading:false,
                profile:action.payload
            }
        case USER_GET_PROFILE_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}

export const updateProfileReducer = (state={},action) => {
    switch(action.type){
        case USER_UPDATE_PROFILE_REQUEST:
            return{
                loading:true
            }
        case USER_UPDATE_PROFILE_SUCCESS:
            return{
                loading:false,
                success:true
            }
        case USER_UPDATE_PROFILE_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case USER_UPDATE_PROFILE_RESET:
            return {  }
        default:
            return state
    }
}

export const uploadProfileReducer = (state={},action) => {
    switch(action.type){
        case USER_UPLOAD_PROFILE_REQUEST:
            return{
                loading:true
            }
        case USER_UPLOAD_PROFILE_SUCCESS:
            return{
                loading:false,
                success:true
            }
        case USER_UPLOAD_PROFILE_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case USER_UPLOAD_PROFILE_RESET:
            return{ }
        default:
            return state
    }
}