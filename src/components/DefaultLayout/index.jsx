import { Layout, Menu, Avatar, Badge, Dropdown } from "antd";
import { useState, useMemo } from "react";
import {
  AiFillHome,
  AiOutlineUnorderedList,
  AiOutlineBell,
  AiOutlineLogout,
  AiOutlineSetting,
} from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DefaultLayoutWrapper, ContentWrapper, MenuWrapper } from "./style";

const { Header, Footer, Sider } = Layout;

const items = [
  {
    label: "Home",
    key: "/",
    icon: (
      <Link to="/">
        <AiFillHome />
      </Link>
    ),
  },
  {
    label: "Manage",
    key: "/manage",
    icon: (
      <Link to="/">
        <AiOutlineUnorderedList />
      </Link>
    ),
    children: [
      {
        label: "Class",
        key: "/class",
        icon: <Link to="/class"></Link>,
      },
      {
        label: "Student",
        key: "/student",
        icon: <Link to="/student"></Link>,
      },
      {
        label: "Subject",
        key: "/subject",
        icon: <Link to="/subject"></Link>,
      },
    ],
  },
  {
    label: "Config",
    key: "/config",
    icon: (
      <Link to="/">
        <AiOutlineUnorderedList />
      </Link>
    ),
    children: [
      {
        label: "Account",
        key: "/account",
        icon: <Link to="/account"></Link>,
      },
    ],
  },
];

const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const activeKey = useMemo(() => {
    let openKey = "";

    for (let i = 0; i < items.length; i++) {
      const parent = items[i];

      if (parent?.key === pathname) {
        openKey = parent.key;
        break;
      }

      if (parent?.children) {
        for (let j = 0; j < items.length; j++) {
          if (parent?.children[j]?.key === pathname) {
            openKey = parent.key;
            break;
          }
        }
      }
    }

    return openKey;
  }, [pathname]);

  const onLogout = () => {
    navigate("/");
  };

  const menu = (
    <MenuWrapper>
      <Menu>
        <Menu.Item key={1} onClick={onLogout}>
          <div className="menu-item">
            <div className="icon">
              <AiOutlineLogout />
            </div>

            <span>Logout</span>
          </div>
        </Menu.Item>

        <Menu.Item key={2} onClick={onLogout} className="menu-item">
          <div className="menu-item">
            <div className="icon">
              <AiOutlineSetting />
            </div>

            <span>Config</span>
          </div>
        </Menu.Item>
      </Menu>
    </MenuWrapper>
  );

  return (
    <DefaultLayoutWrapper>
      <Layout className="main-layout">
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo">DASHBOARD</div>

          <Menu
            theme="dark"
            mode="inline"
            items={items}
            openKeys={[activeKey]}
            selectedKeys={[pathname]}
          />
        </Sider>

        <Layout className="site-layout">
          <Header className="dashboard-header">
            <div className="notify">
              <Badge count={5}>
                <AiOutlineBell style={{ fontSize: "1.3rem" }} />
              </Badge>
            </div>

            <Badge style={{ backgroundColor: "#52c41a" }} dot={true}>
              <Dropdown overlay={menu}>
                <Avatar
                  src="https://joeschmoe.io/api/v1/random"
                  style={{ border: "1px solid #f2f2f2" }}
                />
              </Dropdown>
            </Badge>
          </Header>

          <ContentWrapper>{children}</ContentWrapper>

          <Footer className="footer">{`Created by Su @${new Date().getFullYear()}`}</Footer>
        </Layout>
      </Layout>
    </DefaultLayoutWrapper>
  );
};

export default DefaultLayout;
