import Header from './component/header';
import Addbar from './component/addbar';
import TodoTable from './component/todotable';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Addbar />
      <TodoTable />
    </div>
  );
}

export default App;
