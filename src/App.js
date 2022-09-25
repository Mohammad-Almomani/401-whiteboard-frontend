import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Post from "./components/post";
import Copyright from "./components/CopyRight";
import cookies from 'react-cookies';
import EditPost from "./components/edit-post";
import MenuAppBar from "./components/navbar";

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
           <Router>
            <MenuAppBar isAuthorized={isAuthorized}  checkIfAuthorized={checkIfAuthorized} />
            <Routes>
              <Route path="/signup/*" element={isAuthorized ?<Navigate to="/post" /> :<SignUp checkIfAuthorized={checkIfAuthorized} /> } />
              {/* <Route path="/edit/:id" element={isAuthorized ? <EditPost  /> :  <Navigate to="/signin" />} /> */}
              <Route path="/post/*" element={isAuthorized ? <Post checkIfAuthorized={checkIfAuthorized} /> :  <Navigate to="/signin" />} />
              <Route path="/signin/*" element={isAuthorized ? <Navigate to="/Post" /> : <SignIn checkIfAuthorized={checkIfAuthorized} />} />
              <Route path="/*" element={isAuthorized ? <Post checkIfAuthorized={checkIfAuthorized} /> : <Navigate to="/signin" /> }/>

            </Routes>
        <Copyright sx={{ mt: 8, mb: 4 }}/>
          </Router>
        </>
      </div>
  );
}

export default App;

