import { notification } from "antd";
import { Outlet, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import Class from "@/pages/Manage/Class";
import Student from "@/pages/Manage/Student";
import Subject from "@/pages/Manage/Subject";
import HomePage from "@/pages/HomePage";
import SignIn from "@/pages/User/SignInUp/SignIn";

//public routes
const publicRoutes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/signin",
    component: SignIn,
  },
  {
    path: "/signup",
    component: SignIn,
  },
];
const privateRoutes = [
  {
    path: "/class",
    component: Class,
  },
  {
    path: "/student",
    component: Student,
  },
  {
    path: "/subject",
    component: Subject,
  },
];

const PrivateRoutesComponent = (props) => {
  const { isAuth } = props;

  if (!isAuth) {
    notification["error"]({
      message: "You must be logged in",
      description: "",
      duration: 2,
    });
  }

  setTimeout(() => {}, 8000);

  return isAuth ? <Outlet /> : <Navigate to="/signin" />;
};

export { publicRoutes, privateRoutes };

export default connect(
  (store) => ({
    isAuth: store.User.isAuth,
  }),
  {}
)(PrivateRoutesComponent);
