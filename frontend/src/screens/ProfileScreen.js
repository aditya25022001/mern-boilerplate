import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getProfileAction } from '../actions/profileActions'

export const ProfileScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userGetProfile = useSelector(state => state.userGetProfile)
    const { loading, error, profile } = userGetProfile

    useEffect(() => {
        if(!userInfo){
            navigate('/')
        }
        else{
            dispatch(getProfileAction())
        }
    },[userInfo, navigate, dispatch])
    
    return (
        <div>
            {loading}
            {error}
            {JSON.stringify(profile)}
        </div>
    )
}
