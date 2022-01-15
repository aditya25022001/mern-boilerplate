import React, { useEffect, useState } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Avatar , Tooltip } from '@mui/material';
import { getProfileAction } from '../reducers/profileSlices/getProfileSlice';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Skeleton from '@mui/material/Skeleton';

export const Header = () => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userGetProfile = useSelector(state => state.userGetProfile)
    const { profile } = userGetProfile

    const [visible, setVisible] = useState(true)

    useEffect(() => {
        if(userInfo){
            dispatch(getProfileAction())
        }
    },[userInfo, dispatch])

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
                <Nav className={typeof window!==undefined && window.innerWidth>992 ? 'ml-auto mr-5' : 'ml-auto border-bottom py-1'}>
                    <Link className='header_link' to='/'>
                        Home
                    </Link>
                </Nav>
                <Nav className={typeof window!==undefined && window.innerWidth>992 ? 'mr-5' : 'border-bottom py-1'}>
                    <Link className='header_link' to='/docs'>
                        Docs
                    </Link>
                </Nav>
                <Nav className={typeof window!==undefined && window.innerWidth>992 ? 'mr-5' : 'border-bottom py-1'}>
                    <Link className='header_link' to='/features'>
                        Features
                    </Link>
                </Nav>
                <Nav className={typeof window!==undefined && window.innerWidth>992 ? 'mr-5' : 'border-bottom py-1'}>
                    <Link className='header_link' to='/api'>
                        API
                    </Link>
                </Nav>
                <Nav className={typeof window!==undefined && window.innerWidth>992 ? 'mr-5' : 'border-bottom py-1'}>
                    <a className='header_link' href='https://github.com/aditya25022001/mern-boilerplate' target='_blank' rel='noopener noreferrer'>
                        Source {"</>"}
                    </a>
                </Nav>
                {userInfo && <Nav className={typeof window!==undefined && window.innerWidth>992 ? 'mr-5' : 'border-bottom py-1'}>
                    <Link className='header_link' to='/generate'>
                        Generate
                    </Link>
                </Nav>}
                <Nav className={typeof window!==undefined && window.innerWidth>992 ? 'mr-5' : 'border-bottom py-1'}>
                    <Link className='header_link' to='/contact'>
                        Contact
                    </Link>
                </Nav>
                {userInfo && userInfo?.isAdmin && 
                <Nav className={typeof window!==undefined && window.innerWidth>992 ? 'mr-5' : 'border-bottom py-1'}>
                    <Link className='header_link' to='/admin'>
                        Admin
                    </Link>
                </Nav>}
                {userInfo ? 
                <Nav className={typeof window!==undefined && window.innerWidth>992 ? '' : 'pt-2'}>
                    <Tooltip arrow title="Profile" placement="bottom">
                        <Link to='/profile' className='header_link'>
                            {visible 
                            ? <div>
                                <Skeleton animation="wave" variant="circular" height="31px" width="31px" />
                                <img style={{ display:"none" }} src={profile && profile?.user?.profilePic && `${profile?.user?.profilePic}`} alt="something" onLoad={e => setVisible(false)} />
                            </div> 
                            :<Avatar style={{ backgroundColor:'black', width:"31px", height:'31px', cursor:'pointer' }} src={profile && profile?.user?.profilePic && `${profile?.user?.profilePic}`}>{profile?.user?.name[0]}</Avatar>}
                        </Link>
                    </Tooltip>
                </Nav>
                :<Nav className={typeof window!==undefined && window.innerWidth>992 ? 'mr-2' : 'mr-2 pt-2'}>
                    <Link to='/login' className='header_link'>
                        Login
                    </Link>
                </Nav>
                }
            </Navbar.Collapse>
        </Navbar>
    )
}
