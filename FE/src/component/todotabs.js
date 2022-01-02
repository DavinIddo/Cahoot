import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import './todotabs.css';

function TodoTabs({listOfTabs}) {
    const [activeTabs, setActiveTabs] = useState(0)
    const [unfinisedList, setUnfinishedList] = useState([])
    const [completedList, setCompletedList] = useState([])

    function handleClick(index) {
        setActiveTabs(index)
    }

    function getUnfinisedList() {
        fetch('http://localhost:4000/fetch_todo')
        .then(response => response.json())
        .then(result => {
            // console.log(result.todos_list)
            console.log("success")
            if (result.ok === true) {
                setUnfinishedList(result.todos_list)
            } else {
                alert(result.message)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    function getCompletedList() {
        fetch('/fetch_todo')
        .then(response => response.json())
        .then(result => {
            if (result.ok === true) {
                setCompletedList(result.todos_list)
            } else {
                alert(result.message)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        getUnfinisedList()
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
                        {unfinisedList.map(list => <li>{list.input}</li>)}
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