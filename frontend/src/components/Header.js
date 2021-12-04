import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Avatar from '@mui/material/Avatar';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import GitHubIcon from '@mui/icons-material/GitHub';

export const Header = () => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    return (
        <Navbar collapseOnSelect className="border-bottom" expand="lg" variant="light">
                <Navbar.Brand>
                    <Link to='/' className='header_link d-flex' style={{ alignItems:'center' }}>
                        MERN Boilerplate
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle className='border-0' aria-controls="responsive-navbar-nav">
                    <span>
                        <MenuOpenIcon style={{ color:'black' }}/>
                    </span>
                </Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className='ml-auto mr-5'>
                        <Link className='header_link' to='/about'>
                            About
                        </Link>
                    </Nav>
                    <Nav className='mr-5'>
                        <Link className='header_link' to='/docs'>
                            Docs
                        </Link>
                    </Nav>
                    <Nav className='mr-5'>
                        <Link className='header_link' to='/features'>
                            Features
                        </Link>
                    </Nav>
                    <Nav className='mr-1'>
                        <a className='header_link' href='https://github.com/aditya25022001/mern-boilerplate' target='_blank' rel='noopener noreferrer'>
                            <GitHubIcon/>
                        </a>
                    </Nav>
                    {userInfo && 
                    <Nav>
                        <Avatar className='border' src={userInfo?.profilePic}>{userInfo.name[0]}</Avatar>
                    </Nav>
                    }
                </Navbar.Collapse>
        </Navbar>
    )
}
