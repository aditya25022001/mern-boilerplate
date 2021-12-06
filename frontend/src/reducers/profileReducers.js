import { USER_GET_PROFILE_REQUEST, USER_GET_PROFILE_SUCCESS, USER_GET_PROFILE_FAIL } from '../constants/profileConstants'

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