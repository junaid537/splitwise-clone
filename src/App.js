import "antd/dist/antd.min.css";
import "./index.css";

import { Layout } from "antd";
import React from "react";

import AppLayout from "./components/AppLayout";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { useRecoilState } from "recoil";
import { userState } from "./store/user";
//const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const [user, setUser] = useRecoilState(userState);
  return (
    <>
      {!user.email ? (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <>
          <Navbar />
          <Layout
            style={{
              minHeight: "100vh",
              maxWidth: "900px",
              margin: "1px auto",
            }}
          >
            <AppLayout />
          </Layout>
        </>
      )}
    </>
  );
};
export default App;
