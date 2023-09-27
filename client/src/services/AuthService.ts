import { message } from "antd";
import { SignupCredentials } from "../Pages/Authorization/Registration";
import { axios } from "./config";

export class AuthService {
  static signupUser = async ({ credentials }: { credentials: SignupCredentials }) => {
    try {
      const { data } = await axios.post("/auth/signupUser", credentials);

      return data;
    } catch (e) {
      message.error(`Signup failed with ${e.message}`);
      throw new Error(e.message);
    }
  };

  static signinUser = async ({ credentials }: { credentials: SignupCredentials }) => {
    try {
      const { data } = await axios.post("/auth/signinUser", credentials);

      return data;
    } catch (e) {
      message.error(`Signin failed with ${e.message}`);
      throw new Error(e.message);
    }
  };

  static refreshTokens = async () => {
    try {
      const { data } = await axios.get("auth/refreshTokens", { withCredentials: true });

      return data;
    } catch (e) {
      message.error(`Signin failed with ${e.message}`);
      throw new Error(e.message);
    }
  };

  static getUserInfo = async () => {
    try {
      const { data } = await axios.get(`/auth/userInfo`);

      return data.avatarUrl;
    } catch (e) {
      message.error(`Signin failed with ${e.message}`);
      throw new Error(e.message);
    }
  };
}
