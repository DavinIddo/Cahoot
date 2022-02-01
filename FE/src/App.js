import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Search from './pages/Search';
import Generate from './pages/Generate';
import Layout from "./component/Layout";
import Login from "./pages/Login";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false) 

  function handleLogin(event, username, password) {
    event.preventDefault()
    console.log(username, password)

    // fetch('link')
    // .then(response => response.json())
    // .then(result => {
    //     console.log(result)
    //     setIsLoggedIn(true)
    // })
    // .catch(error => {
    //     console.log(error)
    // })
  }

  function handleLogout() {
    setIsLoggedIn(false)
  }

  return (
    <div>
      <Router>
        <Layout isLoggedIn={isLoggedIn} handleLogout={handleLogout}>
          <Routes>
            <Route path='/' element={<Search />} />
            <Route path='/generate' element={<Generate />} />
            <Route path='/login' element={<Login handleLogin={handleLogin} />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
