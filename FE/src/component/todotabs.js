import { useState, useEffect } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Checkbox, List, ListItem, ListItemText, ListItemIcon, ListItemButton, IconButton } from '@mui/material';
import { Dialog, DialogTitle, DialogActions } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types'
import './todotabs.css';

const useStyles = makeStyles({
    listItemText: {
        fontSize: '120%',
        textAlign: 'center'
    }
    // itemChecked: {
    //     fontSize: '120%',
    //     textAlign: 'center'
    // },
    // itemUnchecked: {
    //     fontSize: '120%',
    //     textAlign: 'center',
    //     textDecoration: 'line-through' 
    // }
})

function TodoTabs({listOfTabs}) {
    const [activeTabs, setActiveTabs] = useState(0)
    const [unfinishedList, setUnfinishedList] = useState([])
    const [completedList, setCompletedList] = useState([])
    const [checked, setChecked] = useState([])
    const [open, setOpen] = useState(false)
    const [toDelete, setToDelete] = useState('')
    const classes = useStyles()

    const listedTodos = (list) => {
        return (
            <div>
                <List>
                    {list.map((content, index) => (
                        <ListItem key={index} secondaryAction={
                            <IconButton edge='end' aria-label='delete' onClick={() => handleDelete([true, 1, content])}>
                                <DeleteIcon />
                            </IconButton>
                        }>
                            <ListItemButton onClick={() => handleCheck(content)}>
                                <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
                                <ListItemText classes={{primary: classes.listItemText}} primary={content.input} />
                                <Checkbox color='primary' checked={checked.indexOf(content) !== -1} />                                
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </div>
        )
    }

    function handleDelete(value) {
        if (value[1] === 1) {
            setToDelete(value[2])
        } 
        else if (value[1] === 2) {
            fetch('http://localhost:4000/delete_todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(toDelete)
            })
            .then(response => response.json())
            .then(result => {
                if (result.ok === true) {
                    window.location.reload(false)
                } else {
                    alert(result.message)
                }
            })
            .catch(error => {
                console.log(error)
            })

        }

        setOpen(value[0])
    }

    function handleCheck(value) {
        fetch('http://localhost:4000/update_check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        })
        .then(response => response.json())
        .then(result => {
            if (result.ok === true) {
                console.log("success")
            } else {
                alert(result.message)
            }
        })
        .catch(error => {
            console.log(error)
        })

        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
    }

    function handleClick(index) {
        setActiveTabs(index)
    }   

    function getList(completed_status) {
        const status = (completed_status === 0 ? 'complete' : 'incomplete')

        fetch('http://localhost:4000/fetch_todo/' + status)
        .then(response => response.json())
        .then(result => {
            if (result.ok === true && status === 'complete') {
                setCompletedList(result.todos_list)
                setChecked(result.todos_list)
            } 
            else if (result.ok === true && status === 'incomplete') {
                setUnfinishedList(result.todos_list)
            } 
            else {
                alert(result.message)
            }
        })
    }

    useEffect(() => {
        getList(0)
        getList(1)
    }, [activeTabs])

    return (
        <div className='container'>
            <div className='tabs'>
                {listOfTabs.map((tab, index) => (
                    <div key={index} className={activeTabs === index ? 'tab active-tab' : 'tab'}
                    onClick={() => handleClick(index)}>{tab}</div>
                ))}
            </div>

            <div className='contents'>
                {listOfTabs.map((tab, index) => (
                    <div key={index} className={activeTabs === index ? 'active-content-tab' : 'dormant-content-tab'}>
                        {tab === 'Unfinished' ? listedTodos(unfinishedList) : listedTodos(completedList)}
                    </div>  
                ))}
            </div>
            <Dialog open={open} onClose={() => handleDelete([false])} aria-labelledby="alert-dialog-title">
                <DialogTitle id='alert-dialog-title'>
                    Delete this todo?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => handleDelete([false, 2])}>Yes</Button>
                    <Button onClick={() => handleDelete([false, 0])}>No</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

TodoTabs.propTypes = {
    listOfTabs: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default TodoTabs;