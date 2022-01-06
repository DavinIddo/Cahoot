import { useState, useEffect } from 'react';
import { List, Checkbox } from '@material-ui/core';
import PropTypes from 'prop-types'
import './todotabs.css';

function TodoTabs({listOfTabs}) {
    const [activeTabs, setActiveTabs] = useState(0)
    const [unfinishedList, setUnfinishedList] = useState([])
    const [completedList, setCompletedList] = useState([])

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
                        {tab === 'Unfinished' ? 
                            unfinishedList.map((list, index) => <li key={index}  >{list.input}</li>) : 
                            completedList.map((list, index) => <li key={index}  >{list.input}</li>)
                        }
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