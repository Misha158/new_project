import jwt from "jsonwebtoken";
import { User } from "../Models/User";
import bcrypt from "bcrypt";

interface SignupCredentials {
  name: "";
  email: "";
  password: "";
}

class AuthService {
  signupUser = async ({ credentials }: { credentials: SignupCredentials }) => {
    const hashPassword = bcrypt.hashSync(credentials.password, 5);

    try {
      const data = await User.create({
        ...credentials,
        password: hashPassword,
        id: 0,
        avatar_url: "",
      });
      return data;
    } catch (err) {
      throw err;
    }
  };

  signinUser = async ({ credentials }: { credentials: SignupCredentials }) => {
    try {
      const existedUser = await User.findOne({
        where: {
          email: credentials.email,
        },
      });

      if (!existedUser) {
        // Если пользователь не найден, вернем сообщение об ошибке
        throw new Error("Пользователь не найден");
      }

      const isPasswordValid = bcrypt.compareSync(credentials.password, existedUser.password);

      if (!isPasswordValid) {
        // Если пароль не соответствует, вернем сообщение об ошибке
        throw new Error("Неверный пароль");
      }

      // Возвращаем успешный результат аутентификации
      return { message: "Успешная аутентификация", existedUser };
    } catch (err) {
      throw err;
    }
  };

  refresh = async ({ refreshToken }: { refreshToken: string | null | undefined }) => {
    try {
      if (!refreshToken) {
        throw new Error("No refresh token");
      }

      const userData = jwt.verify(refreshToken, process.env.SECRET_KEY as string);

      return { message: "Успешная аутентификация", userData };
    } catch (err) {
      throw err;
    }
  };

  getUserInfo = async ({ userId }: { userId: number }) => {
    try {
      const userInfo = await User.findOne({
        where: {
          id: userId,
        },
      });

      return { avatarUrl: userInfo?.avatar_url };
    } catch (err) {
      throw err;
    }
  };
}

export default new AuthService();
