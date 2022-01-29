import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Display from '../component/Display';

const useStyles = makeStyles({
    submit: {
        marginLeft: '2%',
        float: 'right'
    },
    container: {
        marginTop: '2%',
        marginBottom: '2%'
    },
    clear: {
        float: 'right',
        marginBottom: '2%'
    }
})

function Search() {
    const classes = useStyles()
    const [skills, setSkills] = useState([])
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

    function handleClear() {
        const newChecked = []
        setChecked(newChecked)
    }

    useEffect(() => {
        fetch('http://localhost:4000/fetch_skills')
        .then(response => response.json())
        .then(result => {
            const newSkills = []

            for (const skill of result[0].skills) {
                newSkills.push(skill.skill_name)
            }
            
            setSkills(newSkills)
        })
        .catch(error => {
            console.log(error)
        })

    }, [])

    return (
        <Container>
            <Typography variant='h5' component='h2' >
                Search through all armor sets
            </Typography>

            <Grid container spacing={4} className={classes.container}>
                {skills.map((skill, index) => (
                    <Grid item key={index} xs={12} sm={6} md={3} lg={2}>
                        <Display skill={skill} checked={checked.indexOf(skill) !== -1} handleCheck={handleCheck} />
                    </Grid>
                ))}
            </Grid>
            
            <div className={classes.submit}>
                <Button
                    onClick={() => handleSubmit()}
                    color='secondary' 
                    variant='contained' 
                    endIcon={<SendIcon />} 
                >
                    Submit
                </Button>
            </div>

            <div className={classes.clear}>
                <Button
                    onClick={() => handleClear()}
                    color='warning'
                    variant='contained'
                >
                    Clear
                </Button>
            </div>
        </Container>
    );
}

export default Search;