import { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

function AddBar() {
    const [task, setTask] = useState('');

    // const handleSubmission = e => {
    //     e.preventDefault()
    //     onSubmission(task)
    // }

    // Act similar to the above const
    function handleSubmission(event) {
        event.preventDefault();
        
    }

    return (
        <div>
            <p>This is the add bar</p>
            <form onSubmit={handleSubmission}>
                <TextField label="Add task" variant="outlined" onChange={e => setTask(e.target.value)} />
                <Button variant="contained" type="submit">Submit</Button>
            </form>
        </div>
    );
}

export default AddBar;