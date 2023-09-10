import React from "react";
import { useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { AuthService } from "../../services/AuthService";
import { Button, Form, Input, Typography } from "antd";
import { SignupCredentials } from "./Registration";

const { Title } = Typography;

export interface SignupCredentials {
  email: "";
  password: "";
}

export const Login = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupCredentials>();

  const onSubmit = async (credentials: SignupCredentials) => {
    const signinUser = await AuthService.signinUser({ credentials });
    if (signinUser.token) {
      localStorage.setItem("access_token", JSON.stringify(signinUser.token));
      navigate("/");
    }
  };

  return (
    <div style={{ width: "500px", margin: "0 auto" }}>
      <Title>Login</Title>

      <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
        <Form.Item label="Email">
          <Controller name="email" control={control} rules={{ required: true }} render={({ field }) => <Input {...field} />} />
          {errors?.email?.type === "required" && <span style={{ color: "red" }}>This field is required</span>}
        </Form.Item>

        <Form.Item label="Password">
          <Controller name="password" control={control} rules={{ required: true }} render={({ field }) => <Input.Password {...field} />} />
          {errors?.password?.type === "required" && <span style={{ color: "red" }}>This field is required</span>}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
