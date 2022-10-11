import React from "react";
import {
  SignInWrapper,
  SignInImage,
  SignInFormWrapper,
  SigninInHeader,
  FormWrapper,
  RegisterUserWrapper,
  RegisterTextNoAccount,
  RegisterDirectPath,
} from "./SignInStyled";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { actSaveInfomationSignIn } from "@/redux/action/user";
import { Button, Form, Input, notification } from "antd";

const SignIn = (props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

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

    axios
      .post("http://localhost:3002/user/sign-in", {
        username: usernameLogin,
        password: passwordLogin,
      })
      .then((res) => {
        if (res?.data?.code === 200) {
          console.log("success");
          onShowLoginNotifcation("success", "Login success");
          props.actSaveInfomationSignIn({
            usernameLogin,
            token: res?.data?.token,
          });

          navigate("/class");
        } else {
          onShowLoginNotifcation("error", "Login fail");
        }
      });
  };

  return (
    <SignInWrapper>
      <SignInImage />
      <SignInFormWrapper>
        <SigninInHeader>Sign In</SigninInHeader>
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
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password placeholder="******" />
            </Form.Item>

            <Form.Item>
              <RegisterUserWrapper>
                <RegisterTextNoAccount>
                  Dont have account?
                </RegisterTextNoAccount>
                <RegisterDirectPath href="/signup">
                  Register now
                </RegisterDirectPath>
              </RegisterUserWrapper>
            </Form.Item>

            <Form.Item style={{ margin: "0 auto" }}>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </FormWrapper>
      </SignInFormWrapper>
    </SignInWrapper>
  );
};

export default connect(
  (store) => ({
    username: store.User.username,
    password: store.User.password,
  }),
  {
    actSaveInfomationSignIn,
  }
)(SignIn);
