import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getProfileAction } from '../reducers/profileSlices/getProfileSlice'
import { updateProfileAction, resetStateUpdate } from '../reducers/profileSlices/updateProfileSlice'
import { uploadProfileAction, resetStateUpload } from '../reducers/profileSlices/uploadProfileSlice'
import { Form, Image, ListGroup } from 'react-bootstrap'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import { Button, Tooltip, Avatar, Badge } from '@mui/material';
import { storage } from '../firebase'
import Skeleton from '@mui/material/Skeleton';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import moment from 'moment'

export const ProfileScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [nameCheck, setNameCheck] = useState("")
    const [imageError, setImageError] = useState(false)
    const [imageUpload, setImageUpload] = useState(false)
    const [visible, setVisible] = useState(true)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userGetProfile = useSelector(state => state.userGetProfile)
    const { loading, error, profile } = userGetProfile

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { loading:loadingUpdate, error:errorUpdate, success } = userUpdateProfile

    const userUploadProfile = useSelector(state => state.userUploadProfile)
    const { loading:loadingUpload, error:errorUpload, success:successUpload } = userUploadProfile

    useEffect(() => {
        if(!userInfo){
            navigate('/')
        }
        else{
            dispatch(getProfileAction())
        }
    },[userInfo, navigate, dispatch])

    useEffect(() => {
        if(profile && profile?.user){
            setName(profile?.user?.name)
            setNameCheck(profile?.user?.name)
        }
    },[profile])

    useEffect(() => {
        if(successUpload){
            dispatch(getProfileAction())
            setTimeout(() => {
                dispatch(resetStateUpload())
            },2500)
        }
    },[successUpload, dispatch])

    useEffect(() => {
        if(success){
            dispatch(getProfileAction())
            setTimeout(() => {
                dispatch(resetStateUpdate())
            },2500)
        }
    },[success, dispatch])

    const uploadProfileHandler = async (e) => {
        e.preventDefault()
        if(['png','jpg','jpeg'].includes(e.target.files[0].name.split('.')[1])){
            const upload = storage.ref(`profile/${profile && profile.user._id}`).put(e.target.files[0])
            upload.on("state_changed",
                snapshot=>{
                    setImageUpload(true)
                },
                error => {
                    console.log(error)
                },
                () => {
                    storage.ref("profile").child(profile && profile.user._id).getDownloadURL()
                    .then((url) => {
                        dispatch(uploadProfileAction({url}))
                        setImageUpload(false)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }
            )
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
        dispatch(updateProfileAction({name}))
    }
    
    return (
        <>
            {success && <Message variant='success' message="Profile Updated Successfully!" />}
            {successUpload && <Message variant='success' message="Profile Picture Uploaded Successfully!" />}
            {(error || imageError || errorUpdate || errorUpload) && <Message variant="error" message={error || errorUpdate || errorUpload  || "Invalid file type"} />}
            {(loading || loadingUpdate || loadingUpload || imageUpload) ? <Loader/> : !imageError &&
                <div className='mt-4'>
                    <div className={`mx-auto`} style={{ width:'max-content' }}>
                        {profile?.user?.profilePic 
                        ? <div>
                            {visible 
                            ?<div>
                                <Skeleton animation="wave" variant="circular" width="13rem" height="13rem" />
                                <img src={profile?.user?.profilePic && `${profile?.user?.profilePic}`} style={{ display:'none' }} alt="something"  onLoad={e => setVisible(false)} />
                            </div> 
                            : <Image roundedCircle className='border-0' src={profile?.user?.profilePic && `${profile?.user?.profilePic}`} style={{ boxShadow:'1px 2px 5px 0px gray', width:"13rem", height:"13rem" }}/>}                        
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
                                <Button variant='contained' disabled={nameCheck===name} type='submit' className='w-100' color='primary'>Update profile</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Form>
                </div>
            }
        </>
    )
}
