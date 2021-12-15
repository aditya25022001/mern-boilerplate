import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import { useNavigate } from 'react-router-dom'
import { getAllUsersAction } from '../reducers/adminSlices/getAllUsersSlice'
import { deleteUserAction, resetStateDelete } from '../reducers/adminSlices/deleteUserSlice'
import { updateUserAction, resetStateUpdate } from '../reducers/adminSlices/updateUserSlice'
import { Form, Modal, ListGroup } from 'react-bootstrap';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Checkbox, FormControlLabel } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PersonIcon from '@mui/icons-material/Person';
import moment from 'moment'

export const AdminScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [openDelete, setOpenDelete] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    const adminGetUsers = useSelector(state => state.adminGetUsers)
    const { loading, error, users } = adminGetUsers

    const adminDeleteUser = useSelector(state => state.adminDeleteUser)
    const { loading:loadingDelete, error:errorDelete, success } = adminDeleteUser

    const adminUpdateUser = useSelector(state => state.adminUpdateUser)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = adminUpdateUser

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin      

    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }
        else{
            if(userInfo && !userInfo.isAdmin){
                navigate('/')
            }
            else{
                dispatch(getAllUsersAction())
            }
        }
    },[dispatch, userInfo, navigate])

    useEffect(() => {
        if(userInfo && userInfo.isAdmin && success){
            dispatch(getAllUsersAction())
            setTimeout(() => {
                dispatch(resetStateDelete())
            },2500)
        }
    },[dispatch, userInfo, success])

    useEffect(() => {
        if(userInfo && userInfo.isAdmin && successUpdate){
            dispatch(getAllUsersAction())
            setTimeout(() => {
                dispatch(resetStateUpdate())
            },2500)
        }
    },[dispatch, userInfo, successUpdate])

    const closeModalDelete = () => {
        setOpenDelete(false)
    }

    const closeModalUPdate = () => {
        setOpenUpdate(false)
    }

    const deleteModal = (name,id) => {
        setName(name)
        setId(id)
        setOpenDelete(true)
    }

    const deleteHandler = () => {
        setOpenDelete(false)
        dispatch(deleteUserAction({id}))
    }

    const updateModal = (name, id, email, isAdmin) => {
        setName(name)
        setEmail(email)
        setId(id)
        setIsAdmin(isAdmin)
        setOpenUpdate(true)
    }

    const updateHandler = () => {
        setOpenUpdate(false)
        dispatch(updateUserAction({id,isAdmin}))
    }


    const tableHeadings = ["Name","Email","Admin","Joined","Last Login","Actions"]

    return (
        <div>
            <div style={{ fontSize:'1.1rem' }} className='mb-4 mt-1'>Admin Portal</div>
            <div style={{ fontSize:'1.1rem' }} className='mb-2'>Users</div>
            {success && <Message variant="success" message="User deleted successfully!" />}
            {successUpdate && <Message variant="success" message="User updated successfully!" />}
            {(error || errorDelete || errorUpdate) && <Message variant="error" message={error || errorDelete || errorUpdate} />}
            {loading || loadingDelete || loadingUpdate
                ? <Loader/> 
                : <TableContainer className='border border-bottom-0 table-responsive rounded table-hover'>
                <Table sx={{ minWidth: 750 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                        {tableHeadings.map((each, index) => (
                            <TableCell align="left" key={index}>{each}</TableCell>
                        ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users && users.map((user,index) => (
                      <TableRow key={index}>
                        <TableCell align="left">{user.name}</TableCell>
                        <TableCell align="left">
                            <a className='header_link' href={`mailto:${user.email}`}>
                                {user.email}
                            </a>
                        </TableCell>
                        <TableCell align="left">{user.isAdmin ? "Yes" : "No"}</TableCell>
                        <TableCell align="left">{moment(user.createdAt).format("Do MMM YYYY")}</TableCell>
                        <TableCell align="left">{user.lastLogin ? moment(user.lastLogin).fromNow() : "No activity"}</TableCell>
                        <TableCell align="left" width="15%">
                            <Tooltip title="Delete user" arrow placement="left">
                                <DeleteIcon onClick={e => deleteModal(user.name, user._id)} style={{ cursor:'pointer', fontSize:'1.2rem', color:'var(--error)' }} className='mr-3'/>
                            </Tooltip>
                            <Tooltip title="Edit user" arrow placement="right">
                                <ModeEditIcon onClick={e => updateModal(user.name, user._id, user.email, user.isAdmin)} style={{ cursor:'pointer', fontSize:'1.2rem', color:'primary' }}/>
                            </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            }
            <Modal centered show={openDelete} onHide={closeModalDelete}>
                <Modal.Header>
                    <Modal.Title className='d-flex' style={{ fontSize:'1rem', alignItems:'center' }}>
                        <ErrorOutlineIcon className='mr-2' style={{ color:'var(--error)' }}/>
                        Confirmation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure that you want to delete the user {name}
                </Modal.Body>
                <Modal.Footer>
                    <Button className='mr-3 py-1 px-2' variant="contained" onClick={closeModalDelete}>
                        No
                    </Button>
                    <Button className='py-1 px-2' style={{ backgroundColor:'var(--error)' }} variant="contained" onClick={deleteHandler}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>            
            <Modal centered show={openUpdate} onHide={closeModalUPdate}>
                <Modal.Header>
                    <Modal.Title className='d-flex' style={{ fontSize:'1rem', alignItems:'center' }}>
                        <PersonIcon className='mr-2'/>
                        Update User Admin Rights 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        <ListGroup.Item className='border-0'>
                            <Form.Group>
                                <Form.Label style={{ fontSize:'0.9rem' }}>Name</Form.Label>
                                <Form.Control disabled style={{ backgroundColor:'white' }} value={name}/>
                            </Form.Group>
                        </ListGroup.Item>
                        <ListGroup.Item className='border-0'>
                            <Form.Group>
                                <Form.Label style={{ fontSize:'0.9rem' }}>Email</Form.Label>
                                <Form.Control disabled style={{ backgroundColor:'white' }} value={email}/>
                            </Form.Group>
                        </ListGroup.Item>
                        <ListGroup.Item className='border-0'>
                            <FormControlLabel control={<Checkbox onChange={e => setIsAdmin(e.target.checked)} checked={isAdmin} />} label="Is Admin" />
                        </ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='mr-3 py-1 px-2' variant="contained" onClick={closeModalUPdate}>
                        cancel
                    </Button>
                    <Button className='py-1 px-2' style={{ backgroundColor:'var(--error)' }} variant="contained" onClick={updateHandler}>
                        update
                    </Button>
                </Modal.Footer>
            </Modal>            
        </div>
    )
}
