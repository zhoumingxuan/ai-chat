"use client";

import { useState } from "react";
import { Button, Input, Form } from "antd";
import { useAuth } from "@/contexts/auth";

export const LoginForm = () => {
  const { login } = useAuth();
  const [form] = Form.useForm();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onFinish = async () => {
    await login(username, password);
  };

  return (
    <div className="p-16 w-[480px] bg-white shadow-md rounded-md">
      <Form
        form={form}
        onFinish={onFinish}
        size="large"
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item
          label="用户名"
          style={{ marginBottom: 16 }}
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="请输入用户名"
          />
        </Form.Item>

        <Form.Item
          label="密码"
          style={{ marginBottom: 16 }}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="请输入密码"
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0,justifyContent:'center',alignItems:'center' }} labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="m-[8px] w-full"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>

  );
};