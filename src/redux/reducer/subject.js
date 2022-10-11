import {
  SET_ADD_SUBJECT_MODAL,
  SET_EDIT_SUBJECT_MODAL,
  SAVE_GET_LIST_SUBJECT,
  SAVE_SELECTED_SUBJECT,
  SAVE_CREATE_SUBJECT,
  SAVE_UPDATE_SUBJECT,
} from "../type";

import { findAndUpdate } from "../util";

const initialState = {
  listSubject: [],
  activeAddModal: false,
  activeEditModal: false,
  selectedSubject: {},
};

const subjectReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SAVE_CREATE_SUBJECT:
      return {
        ...state,
        listSubject: [...state.listSubject, payload],
      };

    case SAVE_UPDATE_SUBJECT:
      return {
        ...state,
        listSubject: findAndUpdate(state.listSubject, payload),
      };

    case SET_ADD_SUBJECT_MODAL:
      return {
        ...state,
        activeAddModal: payload,
      };

    case SET_EDIT_SUBJECT_MODAL:
      return {
        ...state,
        activeEditModal: payload,
      };

    case SAVE_GET_LIST_SUBJECT:
      return {
        ...state,
        listSubject: payload,
      };

    case SAVE_SELECTED_SUBJECT:
      return {
        ...state,
        selectedSubject: payload,
      };

    default:
      return state;
  }
};

export default subjectReducer;
