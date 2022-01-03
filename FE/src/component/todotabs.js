import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import './todotabs.css';

function TodoTabs({listOfTabs}) {
    const [activeTabs, setActiveTabs] = useState(0)
    const [unfinishedList, setUnfinishedList] = useState([])
    const [completedList, setCompletedList] = useState([])

    function handleClick(index) {
        setActiveTabs(index)
    }

    function getunfinishedList() {
        fetch('http://localhost:4000/fetch_todo/incomplete')
        .then(response => response.json())
        .then(result => {
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
        fetch('http://localhost:4000/fetch_todo/complete')
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
        getunfinishedList()
        getCompletedList()
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
                            unfinishedList.map(list => <li>{list.input}</li>) : 
                            completedList.map(list => <li>{list.input}</li>)
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