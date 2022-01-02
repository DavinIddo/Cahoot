import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import './todotabs.css';

function TodoTabs({listOfTabs}) {
    const [activeTabs, setActiveTabs] = useState(0)

    function handleClick(index) {
        setActiveTabs(index)
    }

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