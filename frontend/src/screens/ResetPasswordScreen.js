import React, { useState, useEffect } from 'react'
import { Form, ListGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import Button from '@mui/material/Button';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockIcon from '@mui/icons-material/Lock';
import { resetPasswordAction, resetStatePassword } from '../reducers/recoverySlices/resetPasswordSlice'
import { resetStateSendOtp } from '../reducers/recoverySlices/sendOtpSlice'

export const ResetPasswordScreen = () => {

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showP, setShowP] = useState(false)
    const [showCP, setShowCP] = useState(false)
    const [userError, setUserError] = useState(false)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userResetPassword = useSelector(state => state.userResetPassword)
    const { loading, error, success } = userResetPassword

    const userRequestOtp = useSelector(state => state.userRequestOtp)
    const { otpDetails } = userRequestOtp

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        if(userInfo || !otpDetails){
            navigate('/')
        }
    },[userInfo, navigate, dispatch, otpDetails])

    useEffect(() => {
        if(success){
            setTimeout(() => {
                navigate('/login')
                dispatch(resetStateSendOtp())
                dispatch(resetStatePassword())
            },2000)
        }
    },[success, navigate, dispatch])

    const registerHandler = (e) => {
        e.preventDefault()
        if(password===confirmPassword){
            let id = otpDetails?._id
            dispatch(resetPasswordAction({password, id}))
        }
        else{
            setUserError(true)
        }
    }

    if(userError){
        setTimeout(() => {
            setUserError(false)
        },2500)
    }
    
    return (
        <>
        {(error || userError) && <Message variant='error' message={error||"Passwords do not match"} />}
        {success && <Message variant='success' message="Password reset successful" />}
        {loading 
        ? <Loader/>
        :<Form onSubmit={registerHandler} className='formcomponent mx-auto mt-5'>
            <ListGroup className='card p-3'>
                <ListGroup.Item className='border-0'>
                    <h4 className='d-flex' style={{ alignItems:'center' }}>
                        <LockIcon className='mr-2'/>
                        <div>Set New Password</div>
                    </h4>
                    <p style={{ fontSize:'0.85rem', fontWeight:'400' }} className='mb-0 pb-0 mt-3'>
                        You are just one click away! Just set new password and do a login to continue
                    </p>
                </ListGroup.Item>
                <ListGroup.Item className='border-0'>
                    <Form.Group>
                        <Form.Label style={{ fontSize:'0.9rem' }}>New Password<span style={{ color:'var(--error)' }} className='ml-1'>*</span></Form.Label>
                        <div className='d-flex' style={{ alignItems:'center' }}>   
                            <div className='mr-1' style={{ flex:1 }}>
                                <Form.Control required value={password} type={showP ? "text" :"password"} onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div className='px-2 py-1 rounded' style={{ flex:0, border:'1px solid #d1d1d1' }}>
                                {!showP ? <VisibilityOffIcon style={{ cursor:'pointer' }} onClick={e => setShowP(!showP)}/> : <VisibilityIcon style={{ cursor:'pointer' }} onClick={e => setShowP(!showP)}/>}
                            </div>
                        </div>
                    </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item className='border-0'>
                    <Form.Group>
                        <Form.Label style={{ fontSize:'0.9rem' }}>Confirm New Password<span style={{ color:'var(--error)' }} className='ml-1'>*</span></Form.Label>
                        <div className='d-flex' style={{ alignItems:'center' }}>   
                            <div className='mr-1' style={{ flex:1 }}>
                                <Form.Control required value={confirmPassword} type={showCP ? "text" :"password"} onChange={e => setConfirmPassword(e.target.value)} />
                            </div>
                            <div className='px-2 py-1 rounded' style={{ flex:0, border:'1px solid #d1d1d1' }}>
                                {!showCP ? <VisibilityOffIcon style={{ cursor:'pointer' }} onClick={e => setShowCP(!showCP)}/> : <VisibilityIcon style={{ cursor:'pointer' }} onClick={e => setShowCP(!showCP)}/>}
                            </div>
                        </div>
                    </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item className="border-0 mt-1">
                    <Button className='w-100' variant='contained' type="submit">Reset Password</Button>
                </ListGroup.Item>
            </ListGroup>
        </Form>}
        </>
    )
}
