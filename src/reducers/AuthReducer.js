import { actionType } from "../types/AuthActionTypes";

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case actionType.SUCCESS_LOGIN:
      return {
        ...state,
        userInfo: action.payload,
        token: action.payload.token,
        capabilities: action.payload.capabilities,
        isAuthorized: true,
        notAuthed: false,
      };
    case actionType.FAILED_LOGIN:
      return {
        ...state,
        notAuthed: true,
      };
    case actionType.LOGOUT:
      return {
        ...state,
        userInfo: {},
        isAuthorized: false,
        token: "",
      };

    case actionType.GET_PROFILE:
      return {
        ...state,
        userInfo: action.payload,
        capabilities: action.payload.capabilities,
        isAuthorized: true,
        notAuthed: false,
      };

    case actionType.SUCCESS_SIGNUP:
      return {
        ...state,
        userInfo: action.payload,
        token: action.payload.token,
        capabilities: action.payload.capabilities,
        isAuthorized: true,
        notAuthed: false,
        alreadyExist: false,
      };
    case actionType.FAILED_SIGNUP:
      return {
        ...state,
        alreadyExist: true,
      };

    case actionType.RESET_SIGNUP:
      return {
        ...state,
        alreadyExist: false,
        notFilled: false,
        NotMatched: false,
      };

    case actionType.NOT_FILLED_SIGNUP:
      return {
        ...state,
        notFilled: true,
      };

    case actionType.NOT_MATCHED_SIGNUP:
      return {
        ...state,
        NotMatched: true,
      };

    case actionType.NOT_FILLED_LOGIN:
      return {
        ...state,
        notFilledSignIn: true,
      };

    case actionType.NOT_FILLED_RESET_LOGIN:
      return {
        ...state,
        notFilledSignIn: false,
      };
    case actionType.SIGNUP_VALID:
      return {
        ...state,
        isValid: true,
        message: "Your email looks good!",
      };
    case actionType.SIGNUP_INVALID:
      return {
        ...state,
        isValid: false,
        message: "Please enter a valid email!",
      };

    case actionType.SIGN_SHOW_PASSWORD:
      return {
        ...state,
        passwordType: "text",
      };
    case actionType.SIGN_HIDE_PASSWORD:
      return {
        ...state,
        passwordType: "password",
      };

    case actionType.LOG_SHOW_PASSWORD:
      return {
        ...state,
        passwordTypeSignIn: "text",
      };
    case actionType.LOG_HIDE_PASSWORD:
      return {
        ...state,
        passwordTypeSignIn: "password",
      };

    case actionType.CONTACT_ADMIN:
      return {
        ...state,
        contactAdmin: !state.contactAdmin,
      };
    case actionType.HANDLE_ROLE_CHANGE:
      return {
        ...state,
        role: action.payload,
      };
    default:
      console.error("Invalid action type");
      return state;
  }
};
