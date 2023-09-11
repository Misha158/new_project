import { Form, Button, Input, Typography } from "antd";
import { useForm, Controller } from "react-hook-form";
import { AuthService } from "../../services/AuthService";
import { useNavigate } from "react-router";

const { Title } = Typography;

export interface SignupCredentials {
  name: "";
  email: "";
  password: "";
}

export const Registration = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupCredentials>();

  const onSubmit = async (credentials: SignupCredentials) => {
    const createdUser = await AuthService.signupUser({ credentials });
    if (createdUser.accessToken) {
      localStorage.setItem("access_token", createdUser.accessToken);
      navigate("/");
    }
  };

  return (
    <div style={{ width: "500px", margin: "0 auto" }}>
      <Title>Registration</Title>

      <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
        <Form.Item label="User name">
          <Controller name="name" control={control} rules={{ required: true }} render={({ field }) => <Input {...field} />} />
          {errors?.name?.type === "required" && <span style={{ color: "red" }}>This field is required</span>}
        </Form.Item>

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
