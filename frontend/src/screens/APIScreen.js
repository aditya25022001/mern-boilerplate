import React, { useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getApiEndpointsAction } from '../actions/apiActions'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'

export const APIScreen = () => {

    const dispatch = useDispatch()

    const userGetApiEndpoints = useSelector(state => state.userGetApiEndpoints)
    const { loading, error, endpoints } = userGetApiEndpoints

    const columns = ["Method","Route","Parameters","Access","Description"]

    useEffect(() => {
        dispatch(getApiEndpointsAction())
    },[dispatch])
    
    return (
        <>
            <div style={{ fontSize:'1.1rem' }} className='mb-3'>API Endpoints and description</div>
            {error && <Message variant='error' message={error} />}
            {loading 
            ? <Loader/> 
            : <TableContainer className='border mb-4 border-bottom-0 table-responsive rounded table-hover'>
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
                        <TableCell align="left">{endpoint.access}</TableCell>
                        <TableCell align="left">{endpoint.description}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>}
        </>
    )
}
