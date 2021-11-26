import { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

function AddBar({onSubmission}) {
    const [task, setTask] = useState('');

    // const handleSubmission = e => {
    //     e.preventDefault()
    //     onSubmission(task)
    // }

    // Act similar to the above const
    function handleSubmission(event) {
        event.preventDefault();
        onSubmission(task);
    }

    return (
        <div>
            <p>This is the add bar</p>
            <form onSubmit={handleSubmission}>
                <TextField label="Add task" onChange={e => setTask(e.target.value)} />
                <Button variant="contained" type="submit">Submit</Button>
            </form>
        </div>
    );
}

export default AddBar;