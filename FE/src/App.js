import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Search from './pages/Search';
import Generate from './pages/Generate';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='/generate' element={<Generate />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
