import { createContext, useContext } from "react";
import base64 from "base-64";
import cookies from "react-cookies";
import {
  getUserProfile,
  login,
  logoutHandler,
  signupAction,
} from "../actions/AuthActions";
import { useReducer } from "react";
import { AuthReducer } from "../reducers/AuthReducer";
import { actionType } from "../types/AuthActionTypes";

const LoginContext = createContext();

export const useLoginContext = () => useContext(LoginContext);

const LoginContextProvider = (props) => {
  const token = cookies.load("token") ? cookies.load("token") : "";
  const userInfo = cookies.load("userInfo") ? cookies.load("userInfo") : {};
  const capabilities = cookies.load("capabilities");
  const initialState = {
    userInfo: userInfo,
    role: "user",
    isAuthorized: token ? true : false,
    capabilities: capabilities,
    notAuthed: false,
    token: token,
    alreadyExist: false,
    notFilled: false,
    NotMatched: false,
    notFilledSignIn: false,
    isValid: false,
    message: "",
    passwordType: "password",
    passwordTypeSignIn: "password",
    contactAdmin: false,
  };

  const [user, dispatch] = useReducer(AuthReducer, initialState);

  const handleLogIn = (e) => {
    e.preventDefault();
    const filledData = new FormData(e.currentTarget);
    dispatch({ type: actionType.NOT_FILLED_RESET_LOGIN });
    if (!filledData.get("email") || !filledData.get("password")) {
      dispatch({ type: actionType.NOT_FILLED_LOGIN });
      return;
    }
    dispatch({ type: actionType.NOT_FILLED_RESET_LOGIN });

    const data = {
      username: filledData.get("email"),
      password: filledData.get("password"),
    };
    const encodedCredintial = base64.encode(
      `${data.username}:${data.password}`
    );
    login(dispatch, encodedCredintial);
  };

  const handleSignOut = () => {
    logoutHandler(dispatch);
  };

  // forms validation check

  const togglePassword = () => {
    if (user.passwordType === "password") {
      dispatch({ type: actionType.SIGN_SHOW_PASSWORD });
      return;
    }
    dispatch({ type: actionType.SIGN_HIDE_PASSWORD });
  };

  const togglePasswordSignIn = () => {
    if (user.passwordTypeSignIn === "password") {
      dispatch({ type: actionType.LOG_SHOW_PASSWORD });
      return;
    }
    dispatch({ type: actionType.LOG_HIDE_PASSWORD });
  };

  const handleForgetPassword = () => {
    return dispatch({ type: actionType.CONTACT_ADMIN });
  };

  // signup form validation
  const handleRoleChange = (event) => {
    dispatch({
      type: actionType.HANDLE_ROLE_CHANGE,
      payload: event.target.value,
    });
  };

  const signUp = (e) => {
    e.preventDefault();
    const filledData = new FormData(e.currentTarget);
    dispatch({ type: actionType.RESET_SIGNUP });

    if (
      !filledData.get("email") ||
      !filledData.get("password") ||
      !filledData.get("confirmPassword") ||
      !filledData.get("username")
    ) {
      dispatch({ type: actionType.NOT_FILLED_SIGNUP });
      return;
    }
    dispatch({ type: actionType.RESET_SIGNUP });

    if (filledData.get("password") !== filledData.get("confirmPassword")) {
      dispatch({ type: actionType.NOT_MATCHED_SIGNUP });
      return;
    }
    dispatch({ type: actionType.RESET_SIGNUP });

    if (user.isValid) {
      const data = {
        username: filledData.get("username"),
        email: filledData.get("email"),
        password: filledData.get("password"),
        role: user.role,
      };
      console.log(data);
      signupAction(dispatch, data);
    }
  };

  const emailRegex = /\S+@\S+\.\S+/;

  const validateEmail = (event) => {
    const email = event.target.value;
    if (emailRegex.test(email)) {
      dispatch({ type: actionType.SIGNUP_VALID });
    } else {
      dispatch({ type: actionType.SIGNUP_INVALID });
    }
  };

  const checkToken = async () => {
    const token = cookies.load("token");
    if (token) {
      console.log("token is here");
      getUserProfile(dispatch);
    }
  };

  const canDo = (PostOwner, LoggedUser) => {
    if (PostOwner === LoggedUser || userInfo.capabilities.includes("update")) {
      return true;
    }
    return false;
  };

  const value = {
    notFilled: user.notFilled,
    notAuthed: user.notAuthed,
    togglePassword,
    handleForgetPassword,
    handleLogIn,
    contactAdmin: user.contactAdmin,
    passwordType: user.passwordType,
    isAuthorized: user.isAuthorized,
    handleSignOut,
    NotMatched: user.NotMatched,
    alreadyExist: user.alreadyExist,
    isValid: user.isValid,
    message: user.message,
    role: user.role,
    handleRoleChange,
    signUp,
    validateEmail,
    togglePasswordSignIn,
    passwordTypeSignIn: user.passwordTypeSignIn,
    notFilledSignIn: user.notFilledSignIn,
    user: user.userInfo,
    capabilities: user.capabilities,
    checkToken,
    canDo,
  };
  return (
    <LoginContext.Provider value={value}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
