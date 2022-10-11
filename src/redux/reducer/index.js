import { combineReducers } from "redux";

import classReducer from "./class";
import studentReducer from "./student";
import subjectReducer from "./subject";
import userReducer from "./user";

const rootReducer = combineReducers({
  Class: classReducer,
  Student: studentReducer,
  Subject: subjectReducer,
  User: userReducer,
});

export default rootReducer;
