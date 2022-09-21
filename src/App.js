import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Post from "./components/Post";
import Copyright from "./components/CopyRight";
import cookies from 'react-cookies';

function App() {
  let [isAuthorized, setIsAuthorized] = useState(false);

  const checkIfAuthorized = (bool) => {
    // localStorage.setItem( 'islooged', bool);
    setIsAuthorized(bool);
  };

  useEffect(() => {
    const token = cookies.load('token');
    if(token) {
      setIsAuthorized(true)
    }
  }, []);


  return (
    <div className="App">
        <>
        {console.log("Hello User")}
          {console.log("The login status is saved in the local storage, you can't access the posts page without login, and you cant access the login or sign up pages if you are already logged in")}
          <Router>
            <Routes>
              <Route path="/signup/*" element={isAuthorized ?<Navigate to="/post" /> :<SignUp checkIfAuthorized={checkIfAuthorized} /> } />
              <Route path="/post/*" element={isAuthorized ? <Post checkIfAuthorized={checkIfAuthorized} /> :  <Navigate to="/signin" />} />
              <Route path="/signin/*" element={isAuthorized ? <Navigate to="/Post" /> : <SignIn checkIfAuthorized={checkIfAuthorized} />} />
              <Route path="/*" element={isAuthorized ? <Post checkIfAuthorized={checkIfAuthorized} /> : <Navigate to="/signin" /> }/>

            </Routes>

{/* 
          <Tabs
            
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="card" title="Posts">
              <Post checkIfAuthorized={setIsAuthorized} />
            </Tab>
            <Tab eventKey="home" title="LogIn">
              {!isAuthorized && (
                <SignIn checkIfAuthorized={checkIfAuthorized} />
              )}
                {isAuthorized && (
                  <Post checkIfAuthorized={checkIfAuthorized} />
                  )}
            </Tab>
            <Tab eventKey="profile" title="SignUp">
              <SignUp checkIfAuthorized={checkIfAuthorized} />
            </Tab>
          </Tabs>  */}

        <Copyright sx={{ mt: 8, mb: 4 }}/>
          </Router>
        </>
      </div>
  );
}

export default App;

