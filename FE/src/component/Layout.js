import { makeStyles } from '@material-ui/core';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import React from 'react';

const useStyles = makeStyles((theme) => {
    return {
        toolbar: theme.mixins.toolbar,
        menu: {
            marginRight: '1%'
        }
    }
})

function Layout({ children }) {
    const classes = useStyles()
    const navigate = useNavigate()

    function handleSearch() {
        navigate('/')
    } 

    function handleGenerate() {
        navigate('/generate')
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
                    <Button color="inherit">Login</Button>
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