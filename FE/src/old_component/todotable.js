import TodoTabs from './todotabs';

function TodoTable() {
    return (
        <div className='TodoTable'>
            <TodoTabs listOfTabs={["Unfinished", "Completed"]}/>
        </div>
    );
}

export default TodoTable;