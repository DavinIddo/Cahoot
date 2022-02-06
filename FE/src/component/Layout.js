import { makeStyles } from '@material-ui/core';
import { AppBar, Button, Toolbar, Typography, IconButton, Menu, MenuItem, Dialog, DialogTitle } from '@mui/material';
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useState } from 'react';
import Wishlist from './Wishlist';

const useStyles = makeStyles((theme) => {
    return {
        toolbar: theme.mixins.toolbar,
        menu: {
            marginRight: '1%'
        }
    }
})

function Layout({ children, isLoggedIn, handleLogout, username }) {
    const classes = useStyles()
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)
    const [wishlist, setWishlist] = useState([])
    const [comment, setComment] = useState('')

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

    function handleDialogClose() {
        setOpen(false)
    }

    function handleClick() {
        fetch('http://localhost:4000/get_wishlist/' + username)
        .then(response => response.json())
        .then(result => {
            setWishlist(result['wishlist'])
            setOpen(true)
            setComment('')
        })
        .catch(error => {
            console.log(error)
        })
    }

    function handleDelete(wish) {
        const data = { 'wishlist': wish['wish'], 'username': username }

        fetch('http://localhost:4000/delete_wishlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            setComment(result['comment'])
            setWishlist(result['wishlist'])
        })
        .catch(error => {
            console.log(error)
        })
    }

    function handleDeleteAll() {
        const data = { 'username': username }

        fetch('http://localhost:4000/delete_all_wishlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            setComment(result['comment'])
            setWishlist(result['wishlist'])
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    const handleMenu = (event) => {
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
                            <IconButton color='inherit' onClick={handleMenu}><AccountCircleIcon /></IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => handleClose()}
                            >
                                <MenuItem onClick={() => handleClick()}>My Wishlist</MenuItem>
                                <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                            </Menu>
                            <Dialog open={open} maxWidth='sm' fullWidth onClose={() => handleDialogClose()}>
                                <DialogTitle>
                                    My Wishlist
                                    <Typography color='primary'>{comment}</Typography> 
                                </DialogTitle>
                                <Wishlist wishlists={wishlist} handleDelete={handleDelete} />
                                <Button color='error' variant='contained' onClick={() => handleDeleteAll()}>Delete All</Button>
                            </Dialog>
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