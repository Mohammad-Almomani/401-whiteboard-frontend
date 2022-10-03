import axios from "axios";
import { createContext, useContext, useState } from "react";
import base64 from "base-64";
import cookies from "react-cookies";

const LoginContext = createContext();

export const useLoginContext = () => useContext(LoginContext);

const LoginContextProvider = (props) => {

  // User authentication check
  const [role, setRole] = useState("user");
  let [isAuthorized, setIsAuthorized] = useState(false);
  
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
          console.log(res.data.token);
          cookies.save("token", res.data.token);
          cookies.save("userID", res.data.user._id);
          cookies.save("username", res.data.user.username);
          cookies.save("role", res.data.role);
          checkIfAuthorized(true);
        })
        .catch((err) => setNotAuthed(true));
    };
  
    const handleSignOut = () => {
      cookies.remove("token");
      cookies.remove("userID");
      cookies.remove("username");
      cookies.remove("role");
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
  
  const [post, setPost] = useState(null);


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



  const gitPosts = async () => {
    const allPosts = await axios.get(`${process.env.REACT_APP_BACKEND}/post`, {
      headers: {
        Authorization: `Bearer ${cookies.load("token")}`,
      },
    });

    setPost(allPosts.data);
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
          cookies.save("token", res.data.token);
          cookies.save("role", res.data.role);
          cookies.save("userID", res.data.id);
          cookies.save("username", res.data.username);
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
    gitPosts,
    post,
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
    
  };
  return (
    <LoginContext.Provider value={value}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
