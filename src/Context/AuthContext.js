import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import base64 from "base-64";
import cookies from "react-cookies";

const LoginContext = createContext();

export const useLoginContext = () => useContext(LoginContext);

const LoginContextProvider = (props) => {
  // User authentication check
  const [role, setRole] = useState("user");
  let [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});
  const [capabilities, setCapabilities] = useState();

  const checkIfAuthorized = (bool) => {
    setIsAuthorized(bool);
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    const filledData = new FormData(e.currentTarget);
    setNotAuthed(false);
    setNotFilledSignIn(false);
    if (!filledData.get("email") || !filledData.get("password")) {
      setNotFilledSignIn(true);
      return;
    }
    setNotFilledSignIn(false);

    const data = {
      username: filledData.get("email"),
      password: filledData.get("password"),
    };
    const encodedCredintial = base64.encode(
      `${data.username}:${data.password}`
    );
    axios
      .post(
        `${process.env.REACT_APP_BACKEND}/signin`,
        {},
        {
          headers: {
            Authorization: `Basic ${encodedCredintial}`,
          },
        }
      )
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
        setCapabilities(res.data.capabilities);
        cookies.save("token", res.data.token);
        cookies.save("capabilities", JSON.stringify(res.data.capabilities));
        checkIfAuthorized(true);
      })
      .catch((err) => setNotAuthed(true));
  };

  const handleSignOut = () => {
    setUser({});
    setCapabilities();
    cookies.remove("token");
    cookies.remove("capabilities");
    checkIfAuthorized(false);
  };

  // forms validation check
  const [passwordType, setPasswordType] = useState("password");
  const [passwordTypeSignIn, setPasswordTypeSignIn] = useState("password");

  const [notFilled, setNotFilled] = useState(false);
  const [notFilledSignIn, setNotFilledSignIn] = useState(false);

  const [notAuthed, setNotAuthed] = useState(false);
  const [contactAdmin, setContactAdmin] = useState(false);

  const [NotMatched, setNotMatched] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState(false);

  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState("");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const togglePasswordSignIn = () => {
    if (passwordTypeSignIn === "password") {
      setPasswordTypeSignIn("text");
      return;
    }
    setPasswordTypeSignIn("password");
  };

  const handleForgetPassword = () => {
    return setContactAdmin(!contactAdmin);
  };

  // signup form validation
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const signUp = (e) => {
    e.preventDefault();
    const filledData = new FormData(e.currentTarget);
    setNotFilled(false);
    setAlreadyExist(false);
    setNotMatched(false);

    if (
      !filledData.get("email") ||
      !filledData.get("password") ||
      !filledData.get("confirmPassword") ||
      !filledData.get("username")
    ) {
      setNotFilled(true);
      return;
    }
    setNotFilled(false);
    if (filledData.get("password") !== filledData.get("confirmPassword")) {
      return setNotMatched(true);
    }
    setNotMatched(false);

    if (isValid) {
      const data = {
        username: filledData.get("username"),
        email: filledData.get("email"),
        password: filledData.get("password"),
        role: role,
      };
      console.log(data);
      axios
        .post(`${process.env.REACT_APP_BACKEND}/signup`, data)
        .then((res) => {
          console.log(res.data.user);
          setUser(res.data);
          setCapabilities(res.data.capabilities);
          cookies.save("token", res.data.token);
          cookies.save("capabilities", JSON.stringify(res.data.capabilities));
          checkIfAuthorized(true);
        })
        .catch((e) => setAlreadyExist(true));
    }
  };

  const emailRegex = /\S+@\S+\.\S+/;

  const validateEmail = (event) => {
    const email = event.target.value;
    if (emailRegex.test(email)) {
      setIsValid(true);
      setMessage("Your email looks good!");
    } else {
      setIsValid(false);
      setMessage("Please enter a valid email!");
    }
  };

  const getUserProfile = async () => {
    console.log("getting user profile");

    await axios
      .get(`${process.env.REACT_APP_BACKEND}/profile`, {
        headers: {
          Authorization: `Bearer ${cookies.load("token")}`,
        },
      })
      .then((res) => {
        console.log("done getting user info");
        setUser(res.data);
      });
  };

  const checkToken = async () => {
    const token = cookies.load("token");
    if (token) {
      setIsAuthorized(true);
      setCapabilities(cookies.load("capabilities"));
      getUserProfile();
    }
  };

  const canDo = (PostOwner, LoggedUser) => {
    if (PostOwner === LoggedUser || capabilities.includes("update")) {
      return true;
    }
    return false;
    };

  const value = {
    notFilled,
    notAuthed,
    togglePassword,
    handleForgetPassword,
    handleLogIn,
    contactAdmin,
    passwordType,
    isAuthorized,
    checkIfAuthorized,
    handleSignOut,
    NotMatched,
    alreadyExist,
    isValid,
    message,
    role,
    handleRoleChange,
    signUp,
    validateEmail,
    togglePasswordSignIn,
    passwordTypeSignIn,
    notFilledSignIn,
    user,
    capabilities,
    checkToken,
    canDo
  };
  return (
    <LoginContext.Provider value={value}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
