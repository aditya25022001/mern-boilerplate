import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userRegisterReducer, userLoginReducer } from './reducers/authReducers' 
import { sendOtpReducer, resetPasswordReducer } from './reducers/recoveryReducers'
import { getProfileReducer } from './reducers/profileReducers'

const reducer = combineReducers({ 
    
    userRegister : userRegisterReducer,
    userLogin : userLoginReducer,

    userRequestOtp : sendOtpReducer,
    userResetPassword : resetPasswordReducer,
    
    userGetProfile : getProfileReducer
})

const userInfoFromStorage = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null

const initialState = {
    userLogin : { userInfo : userInfoFromStorage },
    userRegister : { userInfo : userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware))) 

export default store