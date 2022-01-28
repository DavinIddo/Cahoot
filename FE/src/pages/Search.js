import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Display from '../component/Display';

const useStyles = makeStyles({
    submit: {
        float: 'right'
    },
    container: {
        marginTop: '2%',
        marginBottom: '2%'
    }
})

function Search() {
    const classes = useStyles()
    const all_skills = ['Weakness Exploit', 'Attack Boost', 'Ice Resistance', 'Critical Eye', 'Gathering Up', 
                        'Guard Up', 'Airborne']
    const [checked, setChecked] = useState([])

    function handleCheck(skill) {
        const currentIndex = checked.indexOf(skill)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(skill)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
    }

    function handleSubmit() {
        console.log('The following skills has been submitted to be seek within the database: ', checked)
    }

    return (
        <Container>
            <Typography variant='h5' component='h2' >
                Search through all armor sets
            </Typography>

            <Grid container spacing={4} className={classes.container}>
                {all_skills.map((skill, index) => (
                    <Grid item key={index} xs={6} md={4} lg={3}>
                        <Display skill={skill} checked={checked.indexOf(skill) !== -1} handleCheck={handleCheck} />
                    </Grid>
                ))}
            </Grid>
            
            <Button
                onClick={() => handleSubmit()}
                className={classes.submit} 
                color='secondary' 
                variant='contained' 
                endIcon={<SendIcon />} 
            >
                Submit
            </Button>
        </Container>
    );
}

export default Search;