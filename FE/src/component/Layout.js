import { Drawer, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
    root: {
        // display: 'flex'
    }
})

function Layout({ children }) {
    const classes = useStyles()

    return (
        <div className={classes.root}>

            {/* side drawer */}
            <Drawer variant="permanent" anchor='left'>
                <div>
                    <Typography variant="h5">
                        Ninja Gaiden
                    </Typography>
                </div>
            </Drawer>

            <div>
                { children }
            </div>
        </div>
    );
}

export default Layout;