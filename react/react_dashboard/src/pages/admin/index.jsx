import React from 'react'
import { Navigate, Route, Routes} from "react-router-dom"
import { connect } from "react-redux"
import { Layout } from "antd"
import Header from "../../components/header"
import LeftNav from "../../components/left-nav"
import Home from "../home";
import Category from "../category";
import Role from "../role/index";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";
import Users from "../user";
import Product from "../product";
import NotFound from "../../components/notfound";

const { Sider, Content} = Layout

function Admin(props){
      const user = props.user;
      // no user info, stay in login page
      if (!user || !user._id) {
        return <Navigate to="/Login" replace={true} />
      }
      return (
        <>
            <Layout style={{ height: "100%", width: "100%" }}>
                <Sider
                    style={{
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                    }}
                >
                    <LeftNav />
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    <Header>Header</Header>
                    <Content style={{ margin: 20, backgroundColor: "#fff" }}>
                        <Routes>
                        <Route path="/home"  element = {<Home/>} />
                        <Route path="/category" element = {<Category/>} />
                        <Route path="/product" element = {<Product/>} />
                        <Route path="/role" element = {<Role/>} />
                        <Route path="/user" element = {<Users/>} />
                        <Route path="/charts/bar" element = {<Bar/>} />
                        <Route path="/charts/line" element = {<Line/>} />
                        <Route path="/charts/pie" element = {<Pie/>} />
                        <Route  element = {<NotFound/>} />

                            {/* <Redirect exact={true} from="/" to="/home" /> */}
                            {/* <Route path="/test" element={Test} /> */}
                        </Routes>
                    </Content>
                    
                    {/* <Footer style={{ textAlign: "center" }}>

                    </Footer> */}
                </Layout>
            </Layout>
        </>
      );
  }
  export default connect((state) => ({ user: state.user }), {})(Admin);