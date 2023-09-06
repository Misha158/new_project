import { message } from "antd";
import { SignupCredentials } from "../Pages/Authorization/Registration";
import { axios } from "./config";

export class AuthService {
  static signupUser = async ({ credentials }: { credentials: SignupCredentials }) => {
    try {
      const { data } = await axios.post("/auth/signupUser", credentials);

      return data;
    } catch (e) {
      message.error(`Sighup failed with ${e.message}`);
      throw new Error(e.message);
    }
  };
}
