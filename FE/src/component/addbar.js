import { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

function AddBar() {
    const [task, setTask] = useState('');

    // const handleSubmission = e => {
    //     e.preventDefault()
    //     onSubmission(task)
    // }

    // --------- Act similar to the above const --------- //
    // function handleSubmission(event) {
    //     event.preventDefault();
    // }

    function handleSubmission(event) {
        const submittedTask = {'input': task}
        event.preventDefault()
        
        fetch('http://localhost:4000/submit_todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submittedTask)
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