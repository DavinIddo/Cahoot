import React, { useState } from 'react'
import { Button, Stack, TextField, Typography } from '@mui/material';
import { Container } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const useStyles = makeStyles({
    stack: {
        marginTop: '2%'
    }
})

function Login({ handleLogin }) {
    const classes = useStyles()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <Container align='center'>
            <Typography variant='h3' component='h2' sx={{ marginTop: '9%' }} >Log In</Typography>
            <Stack 
                className={classes.stack} 
                component='form' 
                sx={{ width: '25%' }} 
                spacing={2} 
                onSubmit={(e) => handleLogin(e, username, password)} 
            > 
                <TextField label='Username' required onChange={e => setUsername(e.target.value)} />
                <TextField label='Password' required onChange={e => setPassword(e.target.value)} type='password' />
                <Button variant='contained' type='submit' endIcon={<ChevronRightIcon />}>Submit</Button>
            </Stack>
        </Container>
    );
}

export default Login;