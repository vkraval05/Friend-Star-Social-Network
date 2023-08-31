import React, { useContext } from 'react'
import './Navbar.scss'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { NavLink, useNavigate } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { DarkModeContext } from '../../Context/DarkModeContext';
import { AuthContext } from '../../Context/AuthContext';

const Navbar = () => {

    const { toggle, darkMode } = useContext(DarkModeContext);
    const { currentUser } = useContext(AuthContext);

    const navigate = useNavigate();

    if (currentUser === null) {
        navigate("/login")
    }

    return (
        <>
            <div className="navbar">
                <div className="left">
                    <NavLink to='/' style={{ textDecoration: "none" }}>
                        {/* <span>iAmSocial</span> */}
                        <img src="/upload/social-app-logo.png" alt="logo" />
                    </NavLink>
                    
                    <HomeOutlinedIcon className='icon icon-mobile' />
                    {!darkMode ? <DarkModeOutlinedIcon onClick={toggle} className='icon' /> : <WbSunnyOutlinedIcon onClick={toggle} className='icon' />}
                    <GridViewOutlinedIcon className='icon icon-mobile' />
                    <div className="search">
                        <SearchOutlinedIcon className='icon' />
                        <input type="text" placeholder='search...' />
                    </div>
                </div>
                <div className="right">
                    <PersonOutlinedIcon className='icon icon-mobile' />
                    <EmailOutlinedIcon className='icon icon-mobile' />
                    <NotificationsOutlinedIcon className='icon icon-mobile' />
                    <NavLink className="user icon" to={`/profile/${currentUser.id}`}>
                        <img width='100px' height='100px' src={currentUser.profilePic ? "/upload/"+ currentUser.profilePic : "/upload/user Default image.png"} alt="abc" />
                        <span>{currentUser.name}</span>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default Navbar
