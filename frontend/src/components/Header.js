import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Avatar , Tooltip } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

export const Header = () => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userGetProfile = useSelector(state => state.userGetProfile)
    const { profile } = userGetProfile

    return (
        <Navbar collapseOnSelect className="border-bottom" expand="lg" variant="light">
            <Navbar.Brand>
                <Link to='/' className='header_link_main d-flex' style={{ alignItems:'center' }}>
                    MERN Boilerplate
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle className='border-0' aria-controls="responsive-navbar-nav">
                <span>
                    <MenuOpenIcon style={{ color:'black' }}/>
                </span>
            </Navbar.Toggle>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className={typeof window!==undefined && window.innerWidth>600 ? 'ml-auto mr-5' : 'ml-auto border-bottom py-1'}>
                    <Link className='header_link' to='/about'>
                        About
                    </Link>
                </Nav>
                <Nav className={typeof window!==undefined && window.innerWidth>600 ? 'mr-5' : 'border-bottom py-1'}>
                    <Link className='header_link' to='/docs'>
                        Docs
                    </Link>
                </Nav>
                <Nav className={typeof window!==undefined && window.innerWidth>600 ? 'mr-5' : 'border-bottom py-1'}>
                    <Link className='header_link' to='/features'>
                        Features
                    </Link>
                </Nav>
                {userInfo && userInfo?.isAdmin && 
                <Nav className={typeof window!==undefined && window.innerWidth>600 ? 'mr-5' : 'border-bottom py-1'}>
                    <Link className='header_link' to='/admin'>
                        Admin
                    </Link>
                </Nav>}
                <Nav className={typeof window!==undefined && window.innerWidth>600 ? 'mr-5' : 'border-bottom py-1'}>
                    <a className='header_link' href='https://github.com/aditya25022001/mern-boilerplate' target='_blank' rel='noopener noreferrer'>
                        Source {"</>"}
                    </a>
                </Nav>
                {userInfo ? 
                <Nav className={typeof window!==undefined && window.innerWidth>600 ? '' : 'pt-2'}>
                    <Tooltip arrow title="Profile" placement="bottom">
                        <Link to='/profile' className='header_link'>
                            <Avatar style={{ backgroundColor:'black', width:"31px", height:'31px', cursor:'pointer' }} src={profile && profile?.user?.profilePic && `/profilePics/${profile?.user?.profilePic}`}>{profile?.user?.name[0]}</Avatar>
                        </Link>
                    </Tooltip>
                </Nav>
                :<Nav className={typeof window!==undefined && window.innerWidth>600 ? '' : 'pt-2'}>
                    <Link to='/login' className='header_link'>
                        Login
                    </Link>
                </Nav>
                }
            </Navbar.Collapse>
        </Navbar>
    )
}
