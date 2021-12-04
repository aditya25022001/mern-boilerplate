import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userRegisterReducer, userLoginReducer, sendOtpReducer, resetPasswordReducer } from './reducers/authReducers' 

const reducer = combineReducers({ 
    userRegister:userRegisterReducer,
    userLogin:userLoginReducer,
    userRequestOtp : sendOtpReducer,
    userResetPassword : resetPasswordReducer 
})

const userInfoFromStorage = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null

const initialState = {
    userLogin : { userInfo : userInfoFromStorage },
    userRegister : { userInfo : userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware))) 

export default store