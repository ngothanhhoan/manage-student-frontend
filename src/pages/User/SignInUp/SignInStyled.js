import styled from "styled-components";
import { LeftOutlined } from "@ant-design/icons";

export const SignInWrapper = styled.button`
  height: 100vh;
  width: 100%;

  display: flex;
`;

export const SignInImage = styled.div`
  max-width: 100%;
  height: 100%;
  flex: 1;
  background-image: url(${(props) => props.imgUrl});

  background-repeat: no-repeat;
  background-position: center;
`;

export const SignInFormWrapper = styled.div`
  position: relative;
  height: 100%;
  flex: 1;
  background-color: #ffffff;

  display: flex;
  flex-direction: column;
`;

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const SigninInHeader = styled.h1`
  position: absolute;
  top: 10%;
  left: 50%;
  margin: 0 auto;
  text-align: center;
  transform: translate(-50%, -50%);
  width: 100%;
`;

export const NavigationBackHomeWrapper = styled.div`
  top: 1rem;
  left: 1rem;
  position: absolute;
`;

export const SignInTitle = styled.div`
  font-size: 2.4rem;
`;
export const NavigationBackHomeIcon = styled(LeftOutlined)`
  color: #1890ff;
  font-size: 0.7rem;
`;

export const NavigationBackHomeText = styled.a`
  text-decoration: underline;
`;

export const RegisterUserWrapper = styled.div`
  width: 20rem;
  margin: 0 auto;
`;

export const RegisterTextNoAccount = styled.span``;

export const RegisterDirectPath = styled.a`
  margin-left: 0.5rem;
`;
