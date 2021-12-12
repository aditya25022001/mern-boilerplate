import { ADMIN_GET_ALL_USERS_REQUEST, ADMIN_GET_ALL_USERS_SUCCESS, ADMIN_GET_ALL_USERS_FAIL, ADMIN_DELETE_USER_REQUEST, ADMIN_DELETE_USER_SUCCESS, ADMIN_DELETE_USER_FAIL } from "../constants/adminConstants";

export const getAllUsersReducer = (state={users:[]},action) => {
    switch(action.type){
        case ADMIN_GET_ALL_USERS_REQUEST:
            return{
                loading:true
            }
        case ADMIN_GET_ALL_USERS_SUCCESS:
            return{
                loading:false,
                users:action.payload.users
            }
        case ADMIN_GET_ALL_USERS_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}

export const adminDeleteUserReducer = (state={},action) => {
    switch(action.type){
        case ADMIN_DELETE_USER_REQUEST:
            return{
                loading:true
            }
        case ADMIN_DELETE_USER_SUCCESS:
            return{
                loading:false,
                success:true
            }
        case ADMIN_DELETE_USER_FAIL:
            return{
                laoding:false,
                error:action.payload
            }
        default:
            return state
    }
}