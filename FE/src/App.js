import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Search from './pages/Search';
import Generate from './pages/Generate';
import Layout from "./component/Layout";
import Auth from "./pages/Auth";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false) 

  function handleLogin(event, username, password) {
    event.preventDefault()
    console.log(username, password)

    const data = { 'username': username, 'password': password}

    // fetch('http://localhost:4000/login', {
    //   method: 'POST',
    //   headers: {
    //       'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // })
    // .then(response => response.json())
    // .then(result => {
    //     console.log(result)
    //     setIsLoggedIn(true)
    // })
    // .catch(error => {
    //     console.log(error)
    // })
  }

  function handleRegister(event, username, password) {
    event.preventDefault()
    console.log(username, password)
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
            <Route path='/auth' element={<Auth handleLogin={handleLogin} handleRegister={handleRegister} />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
