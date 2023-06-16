import './App.css'
import Home from "./components/home"
import Login from "./components/login"
import Register from "./components/register"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';

function App() {

  const [ user, setLoginUser] = useState({ })
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}>
          </Route>

          <Route path="/login" element={<Login />}>
          </Route>

          <Route path="/register" element={<Register />}>
          </Route>

        </Routes>
      </Router>
    </div>
    // <>
    //   {/* <Homepage /> */}
    //    {/* <Login /> */}
    //   {/* <Register />  */}
    // {/* </> */}
  );
}

export default App;
