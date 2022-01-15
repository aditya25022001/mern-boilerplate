import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, ListGroup } from 'react-bootstrap'
import { Button } from '@mui/material'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import { makeContactAction } from '../reducers/contactSlices/contactSlice'

export const ContactScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userMakeContact = useSelector(state => state.userMakeContact)
    const { loading, error, message:messageResponse } = userMakeContact

    useEffect(() => {
        if(userInfo){
            setName(userInfo?.name)
            setEmail(userInfo?.email)
        }
        if(messageResponse){
            setTimeout(() => {
                navigate('/')
            },2500)
        }
    },[userInfo, navigate, messageResponse])

    const contactHandler = (e) => {
        e.preventDefault()
        dispatch(makeContactAction(name,email,message))
    }

    return (
        <>
          {error && <Message variant="error" message={error} />}
          {messageResponse && <Message variant='success' message="Contact placed successfully!" />}
          {loading 
          ? <Loader/> 
          : <Form onSubmit={contactHandler} className='formcomponent mx-auto mt-5'>
              <ListGroup className='card pb-2'>
                  <ListGroup.Item className='border-0 d-flex align-items-center'>
                    <div className='mb-1 h4'>Contact us </div>                 
                    <div className='mb-1 ml-3 h2 wave'>&#128075;</div> 
                  </ListGroup.Item>
                  <ListGroup.Item className='border-0'>
                      <Form.Group>
                          <Form.Label>Name<span className='ml-1' style={{ color:'var(--error)' }}>*</span></Form.Label>
                          <Form.Control required value={name} onChange={e => setName(e.target.value)} />
                      </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item className='border-0'>
                      <Form.Group>
                          <Form.Label>Email<span className='ml-1' style={{ color:'var(--error)' }}>*</span></Form.Label>
                          <Form.Control required value={email} onChange={e => setEmail(e.target.value)} />
                      </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item className='border-0'>
                      <Form.Group>
                          <Form.Label>Message<span className='ml-1' style={{ color:'var(--error)' }}>*</span></Form.Label>
                          <Form.Control autoFocus={true} required as="textarea" rows={6} value={message} onChange={e => setMessage(e.target.value)} />
                      </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item className='border-0'>
                      <Button type="submit" variant="contained" color="primary" className="w-100">Contact</Button>
                  </ListGroup.Item>
              </ListGroup>
            </Form>
            }  
        </>
    )
}
