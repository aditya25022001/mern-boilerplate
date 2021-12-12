import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getProfileAction, updateProfileAction } from '../actions/profileActions'
import { Form, Image, ListGroup } from 'react-bootstrap'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import { Button, Tooltip, Avatar, Badge } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import moment from 'moment'
import axios from 'axios'

export const ProfileScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [nameCheck, setNameCheck] = useState("")
    const [imageUpload, setImageUpload] = useState(false)
    const [imageError, setImageError] = useState(false)
    const [update, setUpdate] = useState(false)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userGetProfile = useSelector(state => state.userGetProfile)
    const { loading, error, profile } = userGetProfile

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { loading:loadingUpdate, error:errorUpdate, success } = userUpdateProfile

    useEffect(() => {
        if(!userInfo){
            navigate('/')
        }
        else{
            dispatch(getProfileAction())
        }
    },[userInfo, navigate, dispatch, imageUpload, success])

    useEffect(() => {
        if(profile && profile?.user){
            setName(profile?.user?.name)
            setNameCheck(profile?.user?.name)
        }
    },[profile])

    const uploadProfileHandler = async (e) => {
        e.preventDefault()
        const apiBaseURL = process.env.REACT_APP_SERVER
        const file = e.target.files[0]
        if(['png','jpg','jpeg'].includes(file.name.split('.')[1])){
            const formData = new FormData()
            formData.append('application',file)
            try{
                const config = {
                    headers:{
                        'Content-type':'multipart/form-data',
                        'Authorization': `Bearer ${userInfo.token}`
                    }
                }
                const { data } = await axios.post(`${apiBaseURL}/api/upload`, formData, config)
                if(data){
                    setImageUpload(data.success)
                }
            }
            catch(error){
                console.log(error)
            }
        }
        else{
            setImageError(true)
        }
    }

    if(imageError){
        setTimeout(()=>{
            setImageError(false)
        },2000)
    }

    const updateProfileHandler = (e) => {
        e.preventDefault()
        dispatch(updateProfileAction(name))
    }
    
    return (
        <>
            {success && <Message variant='success' message="Profile Updated Successfully!" />}
            {(error || imageError || errorUpdate) && <Message variant="error" message={error || errorUpdate || "Invalid file type"} />}
            {(loading || loadingUpdate) ? <Loader/> : !imageError &&
                <div>
                    <div className={`mx-auto`} style={{ width:'max-content' }}>
                        {profile?.user?.profilePic 
                        ? <div>
                            <Image roundedCircle className='border-0' src={profile?.user?.profilePic && `./profilePics/${profile?.user?.profilePic}`} style={{ boxShadow:'1px 2px 5px 0px gray', width:"13rem", height:"13rem" }}/>                        
                        </div>
                        :<div>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <label>
                                        <input type="file" onChange={uploadProfileHandler} />
                                        <Tooltip arrow title="Change Picture" placement="bottom">
                                            <CameraAltIcon style={{ padding:'0.2rem', cursor:'pointer', color:'#1c60c7', fontSize:'2rem', borderRadius:'50%', backgroundColor:'white', boxShadow:'1px 2px 5px 0px gray' }}/>
                                        </Tooltip>
                                    </label>
                                }
                            >
                                <Avatar style={{ width:"13rem", height:"13rem" }}>{profile?.user?.name[0]}</Avatar>
                            </Badge>
                        </div>
                        }
                        {profile?.user?.profilePic && <div>
                            <label style={{ cursor:'pointer', width:'max-content', marginLeft:'3rem', marginTop:'-1rem' }}>
                                <input type="file" onChange={uploadProfileHandler} />
                                <Tooltip arrow title="Change Picture" placement="bottom">
                                    <CameraAltIcon style={{ padding:'0.2rem', cursor:'pointer', color:'#1c60c7', fontSize:'2rem', borderRadius:'50%', backgroundColor:'white', left:'7rem', position:'relative', top:'-2.4rem', boxShadow:'1px 2px 5px 0px gray' }}/>
                                </Tooltip>
                            </label>
                        </div>}
                    </div>
                    <Form onSubmit={updateProfileHandler} className='formcomponent mx-auto'>  
                        <ListGroup>
                            <ListGroup.Item className='border-0 py-2'>
                                <Form.Group>
                                    <Form.Label>Unique ID</Form.Label>
                                    <Form.Control style={{ backgroundColor:'white' }} disabled value={profile?.user?._id} />
                                </Form.Group>
                            </ListGroup.Item>
                            <ListGroup.Item className='border-0 py-2'>
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control value={name} onChange={e => {
                                            setName(e.target.value)
                                            setUpdate(true)
                                        }
                                    } />
                                </Form.Group>
                            </ListGroup.Item>
                            <ListGroup.Item className='border-0 py-2'>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control style={{ backgroundColor:'white' }} disabled value={profile?.user?.email} />
                                </Form.Group>
                            </ListGroup.Item>
                            <ListGroup.Item className='border-0 py-2'>
                                <Form.Group>
                                    <Form.Label>Joined</Form.Label>
                                    <Form.Control style={{ backgroundColor:'white' }} disabled value={moment(profile?.user?.createdAt).format('Do MMM YYYY')} />
                                </Form.Group>
                            </ListGroup.Item>
                            <ListGroup.Item className='border-0 py-2 pt-3' style={{ zIndex:'200' }}>
                                <Button variant='contained' disabled={!update || nameCheck===name} type='submit' className='w-100' color='primary'>Update profile</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Form>
                </div>
            }
        </>
    )
}
