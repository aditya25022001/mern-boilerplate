import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, IconButton, Dialog, DialogActions, Button, DialogContent, DialogTitle, Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PublicIcon from '@mui/icons-material/Public';
import ShieldIcon from '@mui/icons-material/Shield';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom'
import { getApiEndpointsAction } from '../actions/apiActions'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'

export const APIScreen = () => {

    const dispatch = useDispatch()

    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [endpoint, setEndpoint] = useState({
        id:"",
        method:"",
        route:"",
        parameters:"",
        access:"",
        description:""
    })
    const userGetApiEndpoints = useSelector(state => state.userGetApiEndpoints)
    const { loading, error, endpoints } = userGetApiEndpoints

    const columns = ["Method","Route","Parameters","Access","Description","Actions"]

    useEffect(() => {
        dispatch(getApiEndpointsAction())
    },[dispatch])

    const setAccessIcon = (access) => {
        switch(access.toLowerCase()){   
            case "public":
                return <PublicIcon/>
            case "private":
                return <ShieldIcon/>
            case "admin":
                return <AdminPanelSettingsIcon/>
            default:
                break
        }
    }

    const deleteEndpointModal = (id,route) => {
        setEndpoint({...endpoint,id,route})
        setDeleteModal(true)
    }

    const editEndpointModal = (id,route,method,parameters,description,access) => {
        setEndpoint({...endpoint,id,route,method,parameters,description,access})
        setEditModal(true)
    }

    const deleteEndpoint = () => {
        dispatch()
    }

    const editEndpoint = () => {
        dispatch()
    }
    
    return (
        <>
            <div style={{ fontSize:'1.1rem' }} className='mb-3'>API Endpoints and description</div>
            {error && <Message variant='error' message={error} />}
            {loading 
            ? <Loader/> 
            : <> 
            <div className='d-flex' style={{ justifyContent:'space-between', alignItems:"center" }}>
                <div>
                    Postman documentation <a style={{ textDecoration:'underline' }} href="https://documenter.getpostman.com/view/14032941/UVR7KTSq" target="_blank" rel="noopener noreferrer">here</a>
                </div>
                <div>
                    <Link to="/add-endpoint">
                        <Tooltip title="Add endpoint" placement="left">
                            <IconButton className='border'>
                                <AddIcon/>
                            </IconButton>
                        </Tooltip>
                    </Link>
                </div>
            </div>
            <TableContainer className='mt-2 border mb-4 border-bottom-0 table-responsive rounded table-hover'>
                <Table aria-label="a dense table" sx={{ minWidth: 750 }}>
                    <TableHead>
                    <TableRow>
                        {columns.map((each, index) => (
                            <TableCell align="left" key={index}>{each}</TableCell>
                        ))}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {endpoints && endpoints.map((endpoint,index) => (
                        <TableRow key={index}>
                            <TableCell align="left">{endpoint.method}</TableCell>
                            <TableCell align="left">{"{serverURL}"+endpoint.route}</TableCell>
                            <TableCell align="left">
                                {endpoint.parameters.includes("and") ? endpoint.parameters.split("and").map((each, index) => (
                                    <li key={index}>{each}</li>
                                )) : endpoint.parameters}
                            </TableCell>
                            <TableCell align="left">{setAccessIcon(endpoint.access)}</TableCell>
                            <TableCell align="left">{endpoint.description}</TableCell>
                            <TableCell align="left">
                                <Tooltip placement="left" title="Delete endpoint" arrow>
                                    <DeleteIcon onClick={e => deleteEndpointModal(endpoint._id,endpoint.route)} style={{ cursor:'pointer', fontSize:'1rem', color:'var(--error)' }} className='mr-2'/>
                                </Tooltip>
                                <Tooltip placement="right" title="Edit endpoint" arrow>
                                    <EditIcon onClick={e => editEndpointModal(endpoint._id,endpoint.route,endpoint.method,endpoint.parameters,endpoint.description,endpoint.access)} style={{ cursor:'pointer', fontSize:'1rem' }}/>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </>
            }
            <Dialog onClose={e => setDeleteModal(false)} open={deleteModal}>
                <DialogTitle>
                    Are you sure?
                </DialogTitle>
                <DialogContent>
                    wngkjebkebrk
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Button variant='contained'>Cancel</Button>
                    <Button variant='contained' style={{ backgroundColor:'var(--error)' }}>Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
