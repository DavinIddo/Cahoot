import { useState, useEffect } from 'react';
import { makeStyles, Checkbox, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import ListItemButton from '@mui/material/ListItemButton';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
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
    const classes = useStyles()

    const listedTodos = (list) => {
        return (
            <div>
                <List>
                    {list.map((content, index) => (
                        <ListItem key={index}>
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
    }, [])

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
                        <h4>This is the content of {tab}</h4>
                        {tab === 'Unfinished' ? listedTodos(unfinishedList) : listedTodos(completedList)}
                    </div>  
                ))}
            </div>
        </div>
    );
}

TodoTabs.propTypes = {
    listOfTabs: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default TodoTabs;