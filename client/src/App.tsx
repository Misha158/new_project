import { TodoPage, AdvertisementPage } from "./Pages";
import { Routes, Route, useLocation } from "react-router-dom";
import { Login } from "./Pages/Authorization/Login";
import { Registration } from "./Pages/Authorization/Registration";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const publicPages = ["/login", "/registration"];

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token && !publicPages.includes(location.pathname)) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<AdvertisementPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Registration" element={<Registration />} />
      <Route path="/todo" element={<TodoPage />} />
      <Route path="/Advertisement" element={<AdvertisementPage />} />
      <Route path="*" element={<div>Not found</div>} />
    </Routes>
  );
};
