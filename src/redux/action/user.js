import { SAVE_INFOMATION_SIGN_IN, SET_AUTH_USER, USER_LOG_OUT } from "../type";

export const actSaveInfomationSignIn = (payload) => ({
  type: SAVE_INFOMATION_SIGN_IN,
  payload,
});

export const actUserLogOut = () => ({
  type: USER_LOG_OUT,
});

export const actSetAuthUser = () => ({
  type: SET_AUTH_USER,
});
