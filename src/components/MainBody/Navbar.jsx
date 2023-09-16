import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Avatar, Box, Container, Drawer, IconButton, InputBase, Menu, MenuItem, Toolbar, Tooltip, Typography, Button, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { ArrowForwardIos, ArrowBackIos, Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { orange } from '@mui/material/colors';
import { logoutUser } from '../../store/userSlice';
import { setSearchQuery, clearSearchQuery } from '../../store/searchSlice';
import MenuIcon from '@mui/icons-material/Menu';
import SidebarOption from "../AsideSections/SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AsideSection from '../AsideSections/AsideSection';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import LikedSong from "../AsideSections/LikedSong";
import { useSelector, useDispatch } from 'react-redux';
import { add } from '../../store/songSlice'
//import { useNavigate } from 'react-router-dom';

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchInputRef = useRef(null);
    const location = useLocation();
    const settings = ['Login', "Logout", 'Subscription', 'Profile'];
    //const [searchQuery, setSearchQuery] = useState("");
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const searchQuery = useSelector((state) => state.search.searchQuery);

    const loggedInUserId = useSelector((state) => state.user.loggedInUserId);
    // const likedSongs = loggedInUserId ? useSelector((state) => state.user.users[loggedInUserId]?.likedSongs): []
    const likedSongs = useSelector((state) => state.user.users[loggedInUserId]?.likedSongs);

    const handleInputChange = (e) => {
        dispatch(setSearchQuery(e.target.value));
    };

    const handleClear = () => {
        dispatch(clearSearchQuery());
    };

    const handleSearchQuery = (e) => {
        setSearchQuery(e.target.value);
    };
    //console.log("searchquery : ", searchQuery);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setLoggedIn(true);
            setAvatar(localStorage.getItem("username").charAt(0).toUpperCase());
        } else {
            setLoggedIn(false);
            setAvatar(null);
        }
    });
    //console.log(loggedIn);

    const handleLogout = async () => {
        //localStorage.clear();
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        //localStorage.removeItem('loggedIn');
        const reduxStateString = localStorage.getItem('reduxState');
        if (reduxStateString) {
            let reduxState = JSON.parse(reduxStateString);
            reduxState.song = [];
            localStorage.setItem('reduxState', JSON.stringify(reduxState));
        }
        dispatch(logoutUser());
        navigate('/login');
    }

    const handleClick = async () => {
        //console.log(pathUrl);
        dispatch(add(likedSongs));
        const pathUrl = "liked"
        const data = likedSongs;
        navigate(`/genre/playlist/likedSongs`, { state: { data, pathUrl } });
    }

    const searchLink = useRef();
    const handleSearch = (e) => {
        e.preventDefault();
        // dispatch(setSearch(searchQuery.toLowerCase()));
        if (searchQuery !== "")
            searchLink.current.click();
    };

    useEffect(() => {
        // Check if the current route is "/home/search"
        if (location.pathname === '/home/search') {
            // Focus on the input element when the route changes to "/home/search"
            searchInputRef.current.focus();
        }
    }, [location]);

    // const handleMenu = (item) => {
    //     const link = item.toLowerCase();
    //     Navigate()
    // }



    const handleOpenUserMenu = (e) => {
        setAnchorElUser(e.currentTarget);
    }
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }

    // const [isAsideOpen, setIsAsideOpen] = useState(false);

    // const handleDrawerToggle = () => {
    //     setIsAsideOpen(!isAsideOpen);
    // };

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        console.log("called");
        mobileOpen ? setMobileOpen(false) : setMobileOpen(true);
        // setMobileOpen((prevState) => !prevState);
    };

    const drawerWidth = 240;
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <SidebarOption clickevent={handleDrawerToggle} Icon={HomeIcon} href={"/"} title={"Home"} disablePadding />
            <SidebarOption clickevent={handleDrawerToggle} Icon={SearchIcon} href={"/home/search"} title={"Search"} disablePadding />
            {/* <SidebarOption clickevent={handleDrawerToggle} Icon={LibraryMusicIcon} title={"Your Library"} disablePadding /> */}
            <div onClick={handleClick}>
                <SidebarOption Icon={ThumbUpOffAltIcon} title={"Liked Songs"} />
            </div>
            <Box overflowY = "auto" maxHeight="150px" maxWidth="260px" whiteSpace="nowrap" overflowX="hidden">
                {likedSongs && likedSongs.length > 0 &&
                    likedSongs.map((playlist, index) => (
                        <LikedSong key={index} props={playlist} />
                        // <SidebarOption key = {playlist.id}option={playlist.name} />
                    ))
                }
            </Box>

        </Box>
    );

    return (
        <>
            <Box sx={{
                background: "black",
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: 'white',
                position: 'fixed',
                zIndex: '1000',
                width: '100%',
                height: "12vh",
                //background: 'linear-gradient(rgba(255, 255, 255, 0.1) 0%, rgb(0, 0, 0) 100%)',
            }}>
                <Box
                    minWidth="50px"
                    height="100%"
                    display={{ xs: 'none', sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex' }}
                >
                    <img
                        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
                        alt=""
                        href="/"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain',
                        }}
                    />
                </Box>
                <Toolbar
                    display={{ xs: 'flex', sm: 'flex', md: 'none', lg: 'none', xl: 'none' }}
                >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                </Toolbar>

                <Box display="flex" flexDirection='row' p='0' flexGrow={1} alignItems='center'
                    justifyContent="space-around"
                // sx={{
                //     '@media screen and (max-width: 700px)': {
                //       justifyContent: 'space-around',
                //     },
                //   }}
                >
                    {/* <IconButton
                    size="large"
                    color="inherit"
                    p='0'
                >
                    <ArrowBackIos />
                </IconButton>
                <IconButton
                    size="large"
                    color="inherit"
                    edge="start"
                >
                    <ArrowForwardIos />
                </IconButton> */}
                    <Box
                        sx={{
                            background: 'white',
                            borderRadius: '30px',
                            minWidth: '300px',
                            alignItems: 'center',
                        }}
                    >
                        <form onSubmit={handleSearch}>
                            <IconButton sx={{ p: '15px' }} color="secondary">
                                <Search />
                            </IconButton>
                            <Link to={"/home/search"} ref={searchLink} />
                            <InputBase
                                sx={{ color: 'purple', paddingTop: '10px' }}
                                autoFocus
                                placeholder="What do you want to hear?"
                                value={searchQuery}
                                onChange={handleInputChange}
                                ref={searchInputRef}
                            />
                        </form>
                    </Box>
                </Box>

                <Box sx={{ alignItems: 'center', padding: '16px' }}>
                    <Tooltip title="Open Settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, right: 0 }}>
                            {avatar ?
                                <Avatar alt="Prashant" sx={{ backgroundColor: 'orange' }}>{avatar}</Avatar> :
                                <Avatar alt="" sx={{ bgcolor: 'gray' }} />
                            }
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id='menu-appbar'
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {/* {settings.map((item) => (
                            <MenuItem key={item} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center"><a href={`/${item.toLowerCase()}`}>{item}</a></Typography>
                            </MenuItem>
                        ))} */}

                        <MenuItem onClick={handleCloseUserMenu}>
                            {loggedIn ?
                                <Typography textAlign="center" onClick={handleLogout}>Logout</Typography> :
                                <Typography textAlign="center" onClick={() => navigate('/login')}>Login</Typography>
                            }
                        </MenuItem>

                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center" onClick={() => navigate('/subscribe')} >Subscription</Typography>
                        </MenuItem>
                        {loggedIn ?
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center" >Profile</Typography>
                                {/* onClick={() => navigate('/profile')} */}
                            </MenuItem> : ""
                        }

                    </Menu>
                </Box>
            </Box>

            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '360px', marginTop: '80px', background: 'black', color: 'white' },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>

        </>
    );
}

export default Navbar;


