import React, { useState } from "react";
import Heading from "./Heading";
import { Route, Routes, useNavigate } from "react-router-dom";
import NewGroup from "./NewGroup";
import Dashboard from "./Dashboard";
import AllExpenses from "./AllExpenses";
import RecentActivity from "./RecentActivity";
import Navbar from "./Navbar";
import { Login } from "../pages/Login";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import IndividualGroup from "./IndividualGroup";
import { getGroups } from "../apis/getGroups";
import { groupState } from "../store/groups";
import { useRecoilState } from "recoil";
import {
  DesktopOutlined,
  DollarOutlined,
  FlagOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { userState } from "../store/user";
import AllRoutes from "./AllRoutes";
import { useEffect } from "react";
import { auth } from "../firebase";

const { Header, Content, Footer, Sider } = Layout;

const AppLayout = () => {
  //const [arr,setArr]=useState([])
  const [headingOfDashboard, setHeadingOfDashboard] = useState("Dashboard");

  let navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [grpid, setgrpId] = useState(1);

  const [collapsed, setCollapsed] = useState(false);

  const { isLoading, error, isError, data, isFetched } = useQuery(
    ["unique12"],
    getGroups
  );
  useEffect(() => {}, [user]);

  let arr = [
    {
      label: "Dashboard",
      key: "u1",
      icon: <DesktopOutlined />,
      onClick: () => {
        console.log("hello");
        setHeadingOfDashboard("Dashboard");
        navigate("/");
      },
    },
    {
      label: "Recent Activity",
      key: "u2",
      icon: <FlagOutlined />,
      onClick: () => {
        console.log("hello");
        setHeadingOfDashboard("Recent Activity");
        navigate("/recentActivity");
      },
    },
    {
      label: "All Expenses",
      key: "u3",
      icon: <DollarOutlined />,
      onClick: () => {
        console.log("hello");
        setHeadingOfDashboard("All Expenses");
        navigate("/allExpenses");
      },
    },
    {
      label: "Add Group",
      key: "u4",
      icon: <UsergroupAddOutlined />,
      onClick: () => {
        console.log("hello");
        setHeadingOfDashboard("Add Group");
        navigate("/new/group");
      },
    },
  ];
  //console.log("data", data, auth.currentUser);
  auth.currentUser &&
    data?.forEach((grp) => {
      arr.push({
        label: grp.name,
        key: grp.id,
        icon: <UserOutlined />,
        onClick: () => {
          //console.log("hello");
          navigate(`/grpPage/${grp.id}`);
          setHeadingOfDashboard(grp.name);
          setgrpId(grp.id);
        },
      });
    });

  if (data && isFetched) {
    console.log("data in AppLayout.js ", data);
    // setGroups(data);
  }
  return (
    <>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{ "background-color": "white" }}
        >
          <div className="logo" />
          <Menu
            theme="light"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={arr}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background site-header"
            style={{
              backgroundColor: "#D3D3D3",
              padding: 0,
              position: "relative",
            }}
          >
            <Heading title={headingOfDashboard} groups={data} grpid={grpid} />
          </Header>

          <Content>
            <AllRoutes />
          </Content>

          <Footer style={{ textAlign: "center" }}>
            SplitWise Clone ©2022 . All CopyRights Reserved
          </Footer>
        </Layout>

    </>
  );
};

export default AppLayout;
