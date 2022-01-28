import { useState, useEffect } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Checkbox, List, ListItem, ListItemText, ListItemIcon, ListItemButton, IconButton } from '@mui/material';
import { Dialog, DialogTitle, DialogActions } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types'

const useStyles = makeStyles({
    listItemText: {
        fontSize: '120%',
        textAlign: 'center'
    },
    container: {
        border: '1.5px solid',
        borderTop: '1px solid transparent',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '2%',
        width: '50%',
        borderColor: 'rgba(83, 82, 82, 0.5)'
    },
    tabs: {
        display: 'flex',
        marginBottom: '10px'
    },
    contents: {

    },
    tab: {
        borderBottom: '1px solid',
        borderColor: 'rgba(83, 82, 82, 0.5)',
        padding: '10px',
        textAlign: 'center',
        width: '52%',
        background: 'rgba(128, 128, 128, 0.075)',
        cursor: 'pointer',
        boxSizing: 'border-box',
        borderBottomRightRadius: '10px',
        borderBottomLeftRadius: '10px'
    },
    activeTab: {
        background: 'white',
        borderTop: '1.5px solid',
        borderBottom: '1px solid transparent',
        cursor: 'auto',
        borderRadius: '10px',
        transform: 'translateY(-10px)',
        borderTopColor: 'black'
    },
    activeContentTab: {
        display: 'inline'
    },
    dormantContentTab: {
        display: 'none'
    }
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
        <div className={classes.container}>
            <div className={classes.tabs}>
                {listOfTabs.map((tab, index) => (
                    <div key={index} className={activeTabs === index ? classes.tab + ' ' + classes.activeTab : classes.tab}
                    onClick={() => handleClick(index)}>{tab}</div>
                ))}
            </div>

            <div className={classes.contents}>
                {listOfTabs.map((tab, index) => (
                    <div key={index} className={activeTabs === index ? classes.activeContentTab : classes.dormantContentTab}>
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