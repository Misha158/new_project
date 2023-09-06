import { Form, Button, Input, Typography } from "antd";
import { useForm, Controller } from "react-hook-form";
import { AuthService } from "../../services/AuthService";

const { Title } = Typography;

export interface SignupCredentials {
  userName: "";
  email: "";
  password: "";
}

export const Registration = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupCredentials>();

  const onSubmit = async (credentials: SignupCredentials) => {
    await AuthService.signupUser({ credentials });
  };

  return (
    <div style={{ width: "500px", margin: "0 auto" }}>
      <Title>Registration</Title>

      <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
        <Form.Item label="User name" name="userName">
          <Controller name="userName" control={control} rules={{ required: true }} render={({ field }) => <Input {...field} />} />
          {errors?.userName?.type === "required" && <span style={{ color: "red" }}>This field is required</span>}
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Controller name="email" control={control} rules={{ required: true }} render={({ field }) => <Input {...field} />} />
          {errors?.email?.type === "required" && <span style={{ color: "red" }}>This field is required</span>}
        </Form.Item>

        <Form.Item label="Password" name="password">
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
