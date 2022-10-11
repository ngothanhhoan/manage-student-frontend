import React from "react";
import {
  SignUpWrapper,
  SignUpImage,
  SignUpFormWrapper,
  SignUpHeader,
  FormWrapper,
  RegisterUserWrapper,
  RegisterTextNoAccount,
  RegisterDirectPath,
} from "./SignUpStyled";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Form, Input, notification } from "antd";
import { actSaveInfomationSignIn } from "@/redux/action/user";

const SignUp = (props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onShowLoginNotifcation = (type, messages) => {
    notification[type]({
      message: messages,
      description: "",
      duration: 2,
    });
  };

  const onSubmitInformationSignUp = async (values) => {
    const usernameLogin = values.username;
    const passwordLogin = values.password;

    axios
      .post("http://localhost:3002/user/register", {
        username: usernameLogin,
        password: passwordLogin,
      })
      .then((res) => {
        console.log("res", res);
        if (res?.data?.code === 200) {
          onShowLoginNotifcation("success", "Register success");

          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        } else {
          onShowLoginNotifcation("error", "Register fail");
        }
      });

    props.actSaveInfomationSignIn({ usernameLogin, passwordLogin });
  };

  return (
    <div>
      <SignUpWrapper>
        <SignUpImage />
        <SignUpFormWrapper>
          <SignUpHeader>Sign Up</SignUpHeader>
          <FormWrapper>
            <Form
              name="basic"
              onFinish={onSubmitInformationSignUp}
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

              <Form.Item>
                <RegisterUserWrapper>
                  <RegisterTextNoAccount>
                    You have account?
                  </RegisterTextNoAccount>
                  <RegisterDirectPath href="/signin">
                    Login now
                  </RegisterDirectPath>
                </RegisterUserWrapper>
              </Form.Item>

              <Form.Item style={{ margin: "0 auto" }}>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </FormWrapper>
        </SignUpFormWrapper>
      </SignUpWrapper>
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
  }
)(SignUp);
