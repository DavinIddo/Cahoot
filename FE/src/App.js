import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Search from './pages/Search';
import Generate from './pages/Generate';
import Layout from "./component/Layout";

function App() {

  return (
    <div>
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<Search />} />
            <Route path='/generate' element={<Generate />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
