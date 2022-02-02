import React, { useState } from 'react'
import { Button, Stack, TextField, Typography, Tooltip } from '@mui/material';
import { Container } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CreateIcon from '@mui/icons-material/Create';
import InputIcon from '@mui/icons-material/Input';

const useStyles = makeStyles({
    stack: {
        marginTop: '2%'
    }
})

function Auth({ handleLogin, handleRegister, registerMessage, handleNotif }) {
    const classes = useStyles()
    const [isLogin, setIsLogin] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleSwitch(status) {
        setIsLogin(status)
        setUsername('')
        setPassword('')
    }

    return (
        <Container align='center'>
            {isLogin ? (
                <div>
                    <Typography variant='h3' component='h2' sx={{ marginTop: '9%' }} >Log In</Typography>
                    <Stack 
                        className={classes.stack} 
                        component='form' 
                        sx={{ width: '25%' }} 
                        spacing={2} 
                        onSubmit={(e) => handleLogin(e, username, password)} 
                    > 
                        <TextField value={username} label='Username' required onChange={e => setUsername(e.target.value)} />
                        <TextField value={password} label='Password' required onChange={e => setPassword(e.target.value)} type='password' />
                        <Button variant='contained' type='submit' endIcon={<ChevronRightIcon />}>Submit</Button>
                    </Stack>

                    <Button 
                        variant='contained' 
                        color='info' 
                        endIcon={<CreateIcon />}
                        sx={{ marginTop: '1%' }}
                        onClick={() => handleSwitch(false)}
                    >
                        Register
                    </Button>
                </div>
            ) : (
                <div>
                    <Typography variant='h3' component='h2' sx={{ marginTop: '9%' }} >Register</Typography>
                    <Stack 
                        className={classes.stack} 
                        component='form' 
                        sx={{ width: '25%' }} 
                        spacing={2}
                        onSubmit={(e) => handleRegister(e, username, password)}
                    > 
                        <TextField value={username} label='Username' required onChange={e => setUsername(e.target.value)} />
                        <TextField value={password} label='Password' required onChange={e => setPassword(e.target.value)} type='password' />
                        <Button variant='contained' type='submit' endIcon={<ChevronRightIcon />}>Submit</Button>
                    </Stack>

                    <Button 
                        variant='contained' 
                        color='info' 
                        endIcon={<InputIcon />}
                        sx={{ marginTop: '1%' }}
                        onClick={() => handleSwitch(true)}
                    >
                        Login
                    </Button>
                </div>
            )}

            {(registerMessage['notif'] !== null) && (
                (registerMessage['error'] === true) ? (
                    <div>
                        <Tooltip title='click to close'>
                            <Button 
                                variant='text' 
                                color='error' 
                                sx={{ marginTop: '2%'}}
                                onClick={() => handleNotif()}
                            >
                                {registerMessage['message']}
                            </Button>
                        </Tooltip>
                    </div>
                ) : (
                    <div>
                        <Tooltip title='click to close'>
                            <Button 
                                variant='text' 
                                color='success' 
                                sx={{ marginTop: '2%'}}
                                onClick={() => handleNotif()}
                            >
                                {registerMessage['message']}
                            </Button>
                        </Tooltip>
                    </div> 
                )
            )}
        </Container>
    );
}

export default Auth;