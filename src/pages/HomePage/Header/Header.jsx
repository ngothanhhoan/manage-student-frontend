import { Link } from "react-router-dom";
import "antd/dist/antd.css";

import {
  HeaderTotal,
  HomePageWrapper,
  ContentHeader,
  HeadingContent,
  ContentDescription,
  ContentButton,
  ButtonManage,
  ButtonView,
} from "./HeaderStyed";
import Topbar from "../Topbar";
import "../style.css";
const Header = () => {
  return (
    <HeaderTotal>
      <HomePageWrapper className="home-Page_Wrapper">
        <Topbar />

        <ContentHeader>
          <HeadingContent>Looking back at 2022 </HeadingContent>

          <ContentDescription>
            <p className="text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              sodales laoreet facilisis. Nunc sagittis purus ipsum, ac mollis
              elit iaculis ut. Mauris egestas arcu ut ex blandit pulvinar.
              Mauris nibh risus, imperdiet et mauris vitae, auctor vulputate
              est.
            </p>
          </ContentDescription>
          <ContentButton>
            <ButtonManage>
              <Link to="/class" style={{ color: "#fff" }}>
                Manage Class
              </Link>
            </ButtonManage>
            <ButtonView>
              <Link to="/student" style={{ color: "#fff" }}>
                View Student
              </Link>
            </ButtonView>
          </ContentButton>
        </ContentHeader>
      </HomePageWrapper>
    </HeaderTotal>
  );
};

export default Header;
