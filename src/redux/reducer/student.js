import {
  SET_MODAL_STUDENT_OPEN,
  SAVE_GET_LIST_STUDENT,
  SET_SELECTED_STUDENT,
  SAVE_CREATE_STUDENT,
  SAVE_RECEIVE_MAIL,
  SAVE_SUBJECT_MAIL,
  SAVE_UPDATE_STUDENT,
} from "../type";
import { findAndUpdate } from '../util';

const initialState = {
  listStudent: [],
  isModalOpen: false,
  isModalSendEmailOpen: false,
  selectedStudent: {},
  receiveMail: "",
  subjectMail: "",
};

const studentReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MODAL_STUDENT_OPEN:
      return {
        ...state,
        isModalOpen: payload,
      };

    case SAVE_GET_LIST_STUDENT:
      return {
        ...state,
        listStudent: payload,
      };

    case SET_SELECTED_STUDENT:
      return {
        ...state,
        selectedStudent: payload,
      };

    case SAVE_CREATE_STUDENT:
      return {
        ...state,
        listStudent: [...state.listStudent, payload],
      };

    case SAVE_UPDATE_STUDENT: {
      return {
        ...state,
        listStudent: findAndUpdate(state.listStudent, payload),
      };
    }

    case SAVE_RECEIVE_MAIL:
      return {
        ...state,
        receiveMail: payload,
      };

    case SAVE_SUBJECT_MAIL:
      return {
        ...state,
        subjectMail: payload,
      };

    default:
      return state;
  }
};

export default studentReducer;
