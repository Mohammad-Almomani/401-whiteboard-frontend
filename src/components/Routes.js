import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Post from "./post";
import Copyright from "./CopyRight";
import cookies from "react-cookies";
import MenuAppBar from "./navbar";
import { useLoginContext } from "../Context/Login_Context";

function AppRoutes() {
  const { isAuthorized, checkIfAuthorized } = useLoginContext();

  useEffect(() => {
    const token = cookies.load("token");
    if (token) {
      checkIfAuthorized(true);
    }
  }, []);

  return (
    <div className="App" data-testid="homePage">
      <>
        <Router>
          <MenuAppBar />
          <Routes>
            <Route
              path="/signup/*"
              element={isAuthorized ? <Navigate to="/post" /> : <SignUp />}
            />
            <Route
              path="/post/*"
              element={isAuthorized ? <Post /> : <Navigate to="/signin" />}
            />
            <Route
              path="/signin/*"
              element={isAuthorized ? <Navigate to="/Post" /> : <SignIn />}
            />
            <Route
              path="/*"
              element={isAuthorized ? <Post /> : <Navigate to="/signin" />}
            />
          </Routes>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Router>
      </>
    </div>
  );
}

export default AppRoutes;
