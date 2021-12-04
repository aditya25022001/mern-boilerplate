import React, { useState } from 'react'
import { Form, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';

export const ForgotPasswordScreen = () => {

    const [email, setEmail] = useState("")
    
    return (
        <Form className='formcomponent mx-auto'>
            <ListGroup className='card p-3'>
                <ListGroup.Item className='border-0'>
                    <h4>
                        Forgot Password
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
        </Form>
    )
}
