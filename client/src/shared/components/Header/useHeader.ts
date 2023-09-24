import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { upload } from "../../../store/slices/uploadsSlice";
import { AuthService } from "../../../services/AuthService";

const isAuthEnabled = import.meta.env.VITE_IS_AUTH_ENABLED === "true";
const publicPages = ["/login", "/registration"];

export const useHeader = () => {
  const dispatch = useAppDispatch();
  const avatarUrl = useAppSelector((state) => state.uploads.avatarUrl);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (isAuthEnabled && !token && !publicPages.includes(location.pathname)) {
      navigate("/login");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchAvatar = async () => {
      const avatarUrl = await AuthService.getUserInfo();
      dispatch(upload(avatarUrl));
    };

    fetchAvatar();
  }, []);

  return {
    avatarUrl,
    logout,
  };
};
