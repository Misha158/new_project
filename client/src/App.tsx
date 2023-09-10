import { TodoPage, AdvertisementPage } from "./Pages";
import { Routes, Route, useLocation } from "react-router-dom";
import { Login } from "./Pages/Authorization/Login";
import { Registration } from "./Pages/Authorization/Registration";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import jwt_decode from "jwt-decode";
import { Button } from "antd";

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

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    navigate("/login");
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
        <Button type="primary" onClick={logout}>
          Logout
        </Button>
      </div>
      <Routes>
        <Route path="/" element={<AdvertisementPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/Advertisement" element={<AdvertisementPage />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </>
  );
};
