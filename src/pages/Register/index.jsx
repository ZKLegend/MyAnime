import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, Row, Col } from "antd";
import "./style.css";

const Register = () => {
  const [registerStatus, setRegisterStatus] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const response = await axios.post(
      `https://6396ea4986d04c763384753d.mockapi.io/UserData`,
      { username: values.username, password: values.password }
    );
    if (response.status == "201") {
      setRegisterStatus(true);
    }
  };

  console.log("Register Status: ", registerStatus);

  return (
    <>
      {registerStatus ? (
        <>
          {" "}
          <h1 style={{ color: "white" }}>Register Succesfull</h1>
          <Link to="/login">
            <Button
              style={{ display: "block", margin: "auto", marginBottom: "20px" }}
            >
              Login Now
            </Button>
          </Link>
        </>
      ) : (
        <>
          <h1 style={{ color: "white" }}>REGISTER PAGE</h1>
          <Row>
            <Col span={16} offset={6}>
              <Form
                form={form}
                autoComplete="off"
                name="register"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 6 }}
                onFinish={onFinish}
              >
                <Form.Item
                  rules={[
                    {
                      required: "true",
                      message: "Please input your username!",
                    },
                  ]}
                  label={<label style={{ color: "white" }}>Username:</label>}
                  name="username"
                  style={{ color: "white" }}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: "true",
                      message: "Please input your password!",
                    },
                  ]}
                  label={<label style={{ color: "white" }}>Password:</label>}
                  name="password"
                  style={{ color: "white" }}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: "true",
                      message: "Please input your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                  label={
                    <label style={{ color: "white" }}>Confirm Password:</label>
                  }
                  name="confirm"
                  dependencies={["password"]}
                  style={{ color: "white" }}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
                  <Button type="primary" htmlType="submit">
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Register;
