import React, { useState, useEffect } from 'react'
import { Form, ListGroup } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import  { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import { forgotPasswordAction } from '../actions/recoveryActions'

export const ForgotPasswordScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userRequestOtp = useSelector(state => state.userRequestOtp)
    const { loading, error, success } = userRequestOtp

    const [email, setEmail] = useState("")

    const sendOTPHandler = (e) => {
        dispatch(forgotPasswordAction(email))
    }

    useEffect(() => {
        if(success){
            setTimeout(() => {
                navigate('/otp')
            },3000)
        }
    },[success, navigate])
    
    return (
        <>
        {success && <Message variant='success' message={`Email has been sent with otp for recovery. If not recieved try checking spam`} />}
        {error && <Message variant="error" message={error} />}
        {loading ? <Loader/>
        :<Form onSubmit={sendOTPHandler} className='formcomponent mx-auto'>
            <ListGroup className='card p-3'>
                <ListGroup.Item className='border-0'>
                    <h4 className='d-flex' style={{ alignItems:'center' }}>
                        <LockIcon className='mr-2'/>
                        <div>Forgot Password</div>
                    </h4>
                    <p style={{ fontSize:'0.85rem', fontWeight:'400' }} className='mb-0 pb-0 mt-3'>
                        Forgot your password? No worries!, enter your email here and we will send you an OTP to your email, just enter that OTP onto the next screen and boom! there you go, reset your password.
                    </p>
                </ListGroup.Item>
                <ListGroup.Item className='border-0'>
                    <Form.Group>
                        <Form.Label style={{ fontSize:'0.9rem' }}>Email<span style={{ color:'var(--error)' }} className='ml-1'>*</span></Form.Label>
                        <Form.Control required value={email} type="email" onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item className="border-0 mt-1">
                    <Button className='w-100' variant='contained' type="submit">Send OTP</Button>
                    <div className='mt-2'>
                        <small>
                            <Link to='/login'>
                                Remembered your password? Go back to login?
                            </Link>
                        </small>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </Form>}
        </>
    )
}
