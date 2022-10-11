import { SAVE_INFOMATION_SIGN_IN, SET_AUTH_USER, USER_LOG_OUT } from "../type";

const initialState = {
  token: "",
  passwordLogin: "",
  isAuth: false,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SAVE_INFOMATION_SIGN_IN:
      return {
        ...state,
        usernameLogin: payload.usernameLogin,
        token: payload.token
      };

    case USER_LOG_OUT:
      return initialState;

    case SET_AUTH_USER:
      return {
        ...state,
        isAuth: payload,
      };

    case USER_LOG_OUT:
      return initialState;

    default:
      return state;
  }
};

export default userReducer;
