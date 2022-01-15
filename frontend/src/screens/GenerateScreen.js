import React, { useEffect } from 'react'
import { Form, ListGroup } from 'react-bootstrap'
import { Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const GenerateScreen = () => {

    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }
    },[userInfo, navigate])

    return (
        <div>
            <Form className='formcomponent mx-auto mt-5'>
                <ListGroup className='card pb-1 pt-2'>
                    <ListGroup.Item className='border-0 d-flex align-items-center'>
                        <div className='mb-1 h6'>Details required to generate your boilerplate</div> 
                    </ListGroup.Item>
                    <ListGroup.Item className='border-0'>
                        <Form.Group>
                            <Form.Label style={{ fontSize:'0.9rem' }}>Email<span className='ml-1' style={{ color:'var(--error)' }}>*</span></Form.Label>
                            <Form.Control></Form.Control>
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item className='border-0'>
                        <Form.Group>
                            <Form.Label style={{ fontSize:'0.9rem' }}>JSON Web Token Secret<span className='ml-1' style={{ color:'var(--error)' }}>*</span></Form.Label>
                            <Form.Control></Form.Control>
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item className='border-0'>
                        <Form.Group>
                            <Form.Label style={{ fontSize:'0.9rem' }}>Mongo URI<span className='ml-1' style={{ color:'var(--error)' }}>*</span></Form.Label>
                            <Form.Control></Form.Control>
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item className='border-0'>
                        <Form.Group>
                            <Form.Label style={{ fontSize:'0.9rem' }}>Password<span className='ml-1' style={{ color:'var(--error)' }}>*</span></Form.Label>
                            <Form.Control></Form.Control>
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item className='border-0'>
                        <Form.Group>
                            <Form.Label style={{ fontSize:'0.9rem' }}>PORT</Form.Label>
                            <Form.Control></Form.Control>
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item className='border-0'>
                        <Button variant='contained' className='w-100 mb-2'>Generate</Button>
                    </ListGroup.Item>
                </ListGroup>
                
            </Form>
        </div>
    )
}
