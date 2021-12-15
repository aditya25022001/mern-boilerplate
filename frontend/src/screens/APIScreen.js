import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

export const APIScreen = () => {

    const columns = ["Method","Route","Parameters","Access","Description"]
    const endpoints = [
        {
            method:"POST",
            route:"/api/auth/register",
            parameters:"body : JSON{name, email, password}",
            access:"Public",
            description:"A route for user to register"
        },
        {
            method:"POST",
            route:"/api/auth/login",
            parameters:"body : JSON{email, password}",
            access:"Public",
            description:"A route for user to login"
        },
        {
            method:"GET",
            route:"/api/profile",
            parameters:"headers : Authorization : Bearer token",
            access:"Private",
            description:"A route for user to get his/her profile"
        },
        {
            method:"PUT",
            route:"/api/profile/update",
            parameters:"headers : Authorization : Bearer token and body : JSON{name}",
            access:"Private",
            description:"A route for user to update his/her profile"
        },
        {
            method:"POST",
            route:"/api/recovery/sendOTP",
            parameters:"body : JSON{email}",
            access:"Public",
            description:"A route for user to get OTP for reseting password"
        },
        {
            method:"PUT",
            route:"/api/recovery/reset",
            parameters:"body : JSON{id,password}",
            access:"Public",
            description:"A route for user to reset password"
        },
        {
            method:"POST",
            route:"/api/profile/upload",
            parameters:"headers : Authorization : Bearer token and body : JSON{url}",
            access:"Private",
            description:"A route for user to upload/change profile pic"
        },
        {
            method:"GET",
            route:"/api/admin/users",
            parameters:"headers : Authorization : Bearer token",
            access:"Admin",
            description:"A route for admin to get all users"
        },
        {
            method:"DELETE",
            route:"/api/admin/delete/:id",
            parameters:"headers : Authorization : Bearer token and param : {id}",
            access:"Admin",
            description:"A route for admin to delete a user"
        },
        {
            method:"PUT",
            route:"/api/admin/update",
            parameters:"headers : Authorization : Bearer token and body : JSON{id, isAdmin}",
            access:"Admin",
            description:"A route for admin to update a user's admin rights"
        },
    ]
    
    return (
        <>
            <div style={{ fontSize:'1.1rem' }} className='mb-3'>API Endpoints and description</div>
            <TableContainer className='border border-bottom-0 table-responsive rounded table-hover'>
                <Table aria-label="a dense table" sx={{ minWidth: 750 }}>
                    <TableHead stickyHeader>
                    <TableRow>
                        {columns.map((each, index) => (
                            <TableCell align="left" key={index}>{each}</TableCell>
                        ))}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {endpoints.map((endpoint,index) => (
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
            </TableContainer>
        </>
    )
}
