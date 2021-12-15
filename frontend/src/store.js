import { configureStore } from '@reduxjs/toolkit'
import registerReducer from './reducers/authSlices/registerSlice'
import loginReducer from './reducers/authSlices/loginSlice'
import getProfileReducer from './reducers/profileSlices/getProfileSlice'
import updateProfileReducer from './reducers/profileSlices/updateProfileSlice'
import uploadProfileReducer from './reducers/profileSlices/uploadProfileSlice'
import getUsersReducer from './reducers/adminSlices/getAllUsersSlice'
import deleteUserReducer from './reducers/adminSlices/deleteUserSlice'
import updateUserReducer from './reducers/adminSlices/updateUserSlice'

const store = configureStore({
    reducer:{
        userLogin : loginReducer,
        userRegister : registerReducer,
        userGetProfile : getProfileReducer,
        userUpdateProfile : updateProfileReducer,
        userUploadProfile : uploadProfileReducer,
        adminGetUsers : getUsersReducer,
        adminDeleteUser : deleteUserReducer,
        adminUpdateUser : updateUserReducer
    }
})

export default store