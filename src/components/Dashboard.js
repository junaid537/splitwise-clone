import { Divider } from "antd";
import { Header } from "antd/lib/layout/layout";
import React from "react";
import SubDashboard from "./SubDashboard";

const Dashboard = () => {
  return (
    <>
    <SubDashboard/>
    </>
  );
};

export default Dashboard;

/*
<div style={{ display: "flex", justifyContent: "space-around" }}>
        Text
        <Divider
          type="vertical"
          style={{ "background-color": "green", height: "30px" }}
        />
        <a href="#">Link</a>
        <Divider
          type="vertical"
          style={{ "background-color": "green", height: "30px" }}
        />
        <a href="#">Link</a>
      </div>
*/
