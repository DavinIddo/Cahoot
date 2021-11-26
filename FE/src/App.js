import { useState } from 'react';
import Header from './component/header';
import Addbar from './component/addbar';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  function handleTasks(data) {
    setTasks(tasks.concat(data));
  }

  return (
    <div className="App">
      <Header />
      <Addbar onSubmission={handleTasks} />
      <p>aaa</p>
      <p>{tasks}</p>
    </div>
  );
}

export default App;
