import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyle = makeStyles({
    header: {
        backgroundColor: '#438ea5',
        minHeight: '10vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(10px + 2vmin)',
        color: 'white',
    }
})

function Header() {
    const classes = useStyle()

    return(
        <header className={classes.header}>
            <p>This is the header of the app</p>
        </header>
    );
}

export default Header;