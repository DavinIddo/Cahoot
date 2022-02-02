import { makeStyles } from '@material-ui/core';
import { AppBar, Button, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => {
    return {
        toolbar: theme.mixins.toolbar,
        menu: {
            marginRight: '1%'
        }
    }
})

function Layout({ children, isLoggedIn, handleLogout }) {
    const classes = useStyles()
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null)

    function handleSearch() {
        navigate('/')
    } 

    function handleGenerate() {
        navigate('/generate')
    }

    function handleLogin() {
        navigate('/auth')
    }

    function handleClose() {
        setAnchorEl(null)
    }
    
    function handleMenu(event) {
        setAnchorEl(event.currentTarget)
    }

    return (
        <div>
            {/* app bar */}
            <AppBar elevation={1}>
                <Toolbar>
                    <MenuIcon className={classes.menu} /> 
                    <Button color='inherit' startIcon={<SearchIcon />} onClick={() => handleSearch()} sx={{ marginRight: '2%'}} >Search</Button>
                    <Button color='inherit' startIcon={<SettingsIcon />} onClick={() => handleGenerate()}>Generate</Button>
                    
                    <Typography variant="h6" sx={{ flexGrow: 1 }} ></Typography>

                    {!(isLoggedIn) ? (
                        <Button color="inherit" onClick={() => handleLogin()}>Login</Button>
                    ) : (
                        <div>
                            <IconButton color='inherit' onClick={(e) => handleMenu(e)}><AccountCircleIcon /></IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => handleClose()}
                            >
                                <MenuItem>My Wishlist</MenuItem>
                                <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>

            <div>
                <div className={classes.toolbar}/>
                { children }
            </div>
        </div>
    );
}

export default Layout;