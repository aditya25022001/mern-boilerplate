import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { makeContactReducer } from './reducers/contactReducers'
import { userRegisterReducer, userLoginReducer } from './reducers/authReducers' 
import { sendOtpReducer, resetPasswordReducer } from './reducers/recoveryReducers'
import { getProfileReducer, updateProfileReducer, uploadProfileReducer } from './reducers/profileReducers'
import { adminGetAllUsersReducer, adminDeleteUserReducer, adminUpdateUserReducer } from './reducers/adminReducers'

const reducer = combineReducers({ 

    userMakeContact : makeContactReducer,
    
    userRegister : userRegisterReducer,
    userLogin : userLoginReducer,

    userRequestOtp : sendOtpReducer,
    userResetPassword : resetPasswordReducer,
    
    userGetProfile : getProfileReducer,
    userUpdateProfile : updateProfileReducer,
    userUploadProfile : uploadProfileReducer,
    
    adminGetUsers : adminGetAllUsersReducer,
    adminDeleteUser : adminDeleteUserReducer,
    adminUpdateUser : adminUpdateUserReducer
})

const userInfoFromStorage = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null

const initialState = {
    userLogin : { userInfo : userInfoFromStorage },
    userRegister : { userInfo : userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware))) 

export default store