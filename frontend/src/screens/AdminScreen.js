import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import { useNavigate } from 'react-router-dom'
import { getAllUsersAction, deleteUserAction } from '../actions/adminActions'
import { Modal } from 'react-bootstrap';
import { Button } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment'

export const AdminScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [id, setId] = useState("")

    const adminGetUsers = useSelector(state => state.adminGetUsers)
    const { loading, error, users } = adminGetUsers

    const adminDeleteUser = useSelector(state => state.adminDeleteUser)
    const { loading:loadingDelete, error:errorDelete, success } = adminDeleteUser

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
    },[dispatch, userInfo, navigate, success])

    const closeModal = () => {
        setOpen(false)
    }

    const deleteModal = (name,id) => {
        setName(name)
        setId(id)
        setOpen(true)
    }

    const deleteHandler = () => {
        setOpen(false)
        dispatch(deleteUserAction(id))
    }

    return (
        <div>
            {success && <Message variant="success" message="User deleted successfully!" />}
            {(error || errorDelete) && <Message variant="error" message={error || errorDelete} />}
            {loading || loadingDelete
                ? <Loader/> 
                : <TableContainer className='border border-bottom-0 table-responsive rounded table-hover'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="left">Email</TableCell>
                      <TableCell align="left">Admin</TableCell>
                      <TableCell align="left">Joined</TableCell>
                      <TableCell align="left">Actions</TableCell>
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
                        <TableCell align="left">
                            <DeleteIcon onClick={e => deleteModal(user.name, user._id)} style={{ cursor:'pointer', fontSize:'1.2rem', color:'var(--error)' }} className='mr-3'/>
                            <ModeEditIcon style={{ cursor:'pointer', fontSize:'1.2rem', color:'primary' }}/>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            }
            <Modal centered show={open} onHide={closeModal}>
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
                    <Button className='mr-3 py-1 px-2' variant="contained" onClick={closeModal}>
                        No
                    </Button>
                    <Button className='py-1 px-2' style={{ backgroundColor:'var(--error)' }} variant="contained" onClick={deleteHandler}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>            
        </div>
    )
}
