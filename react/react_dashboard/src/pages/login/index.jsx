import React from 'react';
import './login.less';
import logo from '../../assets/image/logo.png'
import { Form, Input, Button, message} from 'antd';
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {reqLogin} from  '../../api/index'
import { Navigate } from 'react-router-dom';
import { login } from "../../redux/actions";
import { connect } from "react-redux";

 function Login(props){

    console.log('this is login')
    const onFinish = async (values) => {

        const {username, password} = values

        if (username && password) {
            const response = await reqLogin(username, password)
            if (response.status === 0){
                message.success("login in success")
                props.login(username, password);
            }
            else{
                message.error(response.data.message)
            }
        }
    }

    const onFinishFailed = (values, errorFields, outOfDate) => {
        values.errorFields.map((x) => {
            return console.log(x.errors)
        })
    }

    const validatePwd = (rule, value) => {
    if (!value) {
        return Promise.reject("Please enter Password");
    } else if (value.length < 4) {
        return Promise.reject("Password should be more than 4 characters");
    } else if (value.length > 12) {
        return Promise.reject("Password should be less than 12 characters");
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        return Promise.reject("Password should includes numbers and letters");
    } else {
        return Promise.resolve(); //Login success
    }
    };
      
 
        const user = props.user;
        if (user && user._id) {
            return (
                <Navigate to="/Admin" replace={true} />
              )
        }
        const errorMsg = props.user.errorMsg;
        return(
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="" />
                    <h1>React Project:Management System</h1>
                </header>
                <section className="login-content">
                    <h2>Login</h2>
                    <Form
                        // ref={formRef}
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        >
                        <Form.Item
                            name="username"
                            initialValue="admin"
                            rules={[
                            {
                                required: true,
                                message: "Please enter user name!",
                            },
                            {
                                min: 1,
                                message: "Minimal 5 Characters",
                            },
                            {
                                max: 50,
                                message: "Maximal 12 Characters",
                            },
                            {
                                pattern: /^[a-zA-Z0-9_]+$/,
                                message: "Please enter letters, numbers or _",
                            },
                            ]}>
                            <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            style={{ borderRadius: "5px" }}
                            placeholder="Username:wxy"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            initialValue="admin"
                            rules={[
                            {
                                required: true,
                                message: "Please enter Password!",
                            },
                            {
                                validator: validatePwd,
                            },
                            ]}
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password:helishou"
                            style={{ borderRadius: "5px" }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            style={{ borderRadius: "5px" }}
                            >
                            Login
                            </Button>
                            {/* Or <a href="">register now!</a> */}
                        </Form.Item> 
                     </Form>
                </section>
            </div>
        )
        
}
export default connect((state) => ({ user: state.user }), { login })(Login);