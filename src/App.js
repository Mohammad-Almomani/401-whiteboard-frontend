import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import LoginContextProvider from "./Context/Login_Context";
import AppRoutes from "./components/Routes";

function App() {

  return (
    <LoginContextProvider >
    <AppRoutes />
    </LoginContextProvider>
  );
}

export default App;

