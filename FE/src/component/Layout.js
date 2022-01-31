import { makeStyles } from '@material-ui/core';
import { AppBar, Toolbar } from '@mui/material';
import React from 'react';

const useStyles = makeStyles((theme) => {
    return {
        toolbar: theme.mixins.toolbar
    }
})

function Layout({ children }) {
    const classes = useStyles()

    return (
        <div>
            {/* app bar */}
            <AppBar elevation={1}>
                <Toolbar>

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