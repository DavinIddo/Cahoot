import { Button, Typography } from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';
import React from 'react'

function Display({ skill, checked, handleCheck }) {

    return (
        <div>
            <Button variant='outlined' onClick={() => handleCheck(skill)}>
                <Typography variant='button'>{skill}</Typography>
                <Checkbox color='primary' checked={checked} />
            </Button>
        </div>
    );
}

export default Display;