import {
  SET_MODAL_STUDENT_OPEN,
  SAVE_GET_LIST_STUDENT,
  SET_SELECTED_STUDENT,
  SAVE_CREATE_STUDENT,
  SAVE_RECEIVE_MAIL,
  SAVE_SUBJECT_MAIL,
  SAVE_UPDATE_STUDENT,
} from "../type";

export const actSaveGetListStudent = (payload) => ({
  type: SAVE_GET_LIST_STUDENT,
  payload,
});

export const actSetModalStudentOpen = (payload) => ({
  type: SET_MODAL_STUDENT_OPEN,
  payload,
});

export const actSetSelectedStudent = (payload) => ({
  type: SET_SELECTED_STUDENT,
  payload,
});

export const actSaveCreateStudent = (payload) => ({
  type: SAVE_CREATE_STUDENT,
  payload,
});

export const actSaveUpdateStudent = (payload) => ({
  type: SAVE_UPDATE_STUDENT,
  payload,
});

export const actSaveReceiveMail = (payload) => ({
  type: SAVE_RECEIVE_MAIL,
  payload,
});

export const actSaveSubjectMail = (payload) => ({
  type: SAVE_SUBJECT_MAIL,
  payload,
});
