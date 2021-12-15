import React from 'react'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { IconButton, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux'
import { userLogoutAction } from '../reducers/authSlices/loginSlice'

export const LogoutComponent = () => {
    
    const dispatch = useDispatch()
    
    const logoutHandler = () => {
        dispatch(userLogoutAction())
    }
    
    return (
        <div style={{ zIndex:'1001', backgroundColor:'white' }} onClick={logoutHandler}>
            <IconButton className='border' variant='contained' color="primary" style={{ position:'fixed', bottom:'1rem', right:'1rem', zIndex:'1001', backgroundColor:'white'  }} >
                <Tooltip title="Logout" placement="top" arrow>
                    <PowerSettingsNewIcon style={{ fontSize:'1.8rem' }}/>
                </Tooltip>
            </IconButton>
        </div>
    )
}
