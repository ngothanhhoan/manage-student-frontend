import React, { useMemo } from "react";
import {
  SignInWrapper,
  SignInImage,
  SignInFormWrapper,
  SigninInHeader,
  FormWrapper,
  RegisterUserWrapper,
  RegisterTextNoAccount,
  RegisterDirectPath,
  SignInTitle,
  NavigationBackHomeWrapper,
  NavigationBackHomeIcon,
  NavigationBackHomeText,
} from "./SignInStyled";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { actSaveInfomationSignIn, actSetAuthUser } from "@/redux/action/user";
import { Button, Form, Input, notification } from "antd";

import imageSignIn from "@/image/bg-login.jpg";
import imageSignUp from "@/image/bg-register.jpg";

const SignIn = (props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isSignInMode = useMemo(() => {
    return pathname === "/signin";
  }, []);

  const onShowLoginNotifcation = (type, messages) => {
    notification[type]({
      message: messages,
      description: "",
      duration: 2,
    });
  };

  const onSubmitInformationSignIn = async (values) => {
    const usernameLogin = values.username;
    const passwordLogin = values.password;

    if (isSignInMode) {
      axios
        .post("http://localhost:3002/user/sign-in", {
          username: usernameLogin,
          password: passwordLogin,
        })
        .then((res) => {
          if (res?.data?.code === 200) {
            console.log("success");
            onShowLoginNotifcation("success", "Login success");

            setTimeout(() => {
              navigate("/class");
            }, 1500);
          } else {
            onShowLoginNotifcation("error", "Login fail");
          }
          props.actSetAuthUser(true);
        });

      props.actSaveInfomationSignIn({ usernameLogin, passwordLogin });
    } else {
      axios
        .post("http://localhost:3002/user/register", {
          username: usernameLogin,
          password: passwordLogin,
        })
        .then((res) => {
          if (res?.data?.code === 200) {
            onShowLoginNotifcation("success", "Register success");

            setTimeout(() => {
              navigate("/signin");
            }, 2000);
          } else if (res?.data?.code === 405) {
            onShowLoginNotifcation("error", "User exist");
          } else {
            onShowLoginNotifcation("error", "Register fail");
          }
        });
    }
  };

  return (
    <div>
      <SignInWrapper>
        <SignInImage
          imgUrl={pathname === "/signin" ? imageSignIn : imageSignUp}
        />
        <SignInFormWrapper>
          <SigninInHeader>
            <SignInTitle>{isSignInMode ? "Sign In" : "Sign Up"}</SignInTitle>
          </SigninInHeader>

          <NavigationBackHomeWrapper>
            <NavigationBackHomeIcon></NavigationBackHomeIcon>
            <NavigationBackHomeText href="/">Home</NavigationBackHomeText>
          </NavigationBackHomeWrapper>

          <FormWrapper>
            <Form
              name="basic"
              onFinish={onSubmitInformationSignIn}
              autoComplete="off"
              form={form}
              layout="vertical"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input placeholder="admin123" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                  },
                  { min: 6 },
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject("Password does not match criteria."),
                  },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Type your password" />
              </Form.Item>

              {!isSignInMode ? (
                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          "The two passwords that you entered does not match."
                        );
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="Confirm your password" />
                </Form.Item>
              ) : (
                ""
              )}

              <Form.Item>
                <RegisterUserWrapper>
                  <RegisterTextNoAccount>
                    {isSignInMode ? "Dont have account?" : "Have your account?"}
                  </RegisterTextNoAccount>
                  <RegisterDirectPath
                    href={isSignInMode ? "/signup" : "/signin"}
                  >
                    {isSignInMode ? "Register" : "Login"}
                  </RegisterDirectPath>
                </RegisterUserWrapper>
              </Form.Item>

              <Form.Item style={{ margin: "0 auto" }}>
                <Button type="primary" htmlType="submit">
                  {isSignInMode ? "Login" : "Register"}
                </Button>
              </Form.Item>
            </Form>
          </FormWrapper>
        </SignInFormWrapper>
      </SignInWrapper>
    </div>
  );
};

export default connect(
  (store) => ({
    username: store.User.username,
    password: store.User.password,
  }),
  {
    actSaveInfomationSignIn,
    actSetAuthUser,
  }
)(SignIn);
