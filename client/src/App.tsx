import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Routes, Route, useLocation } from "react-router-dom";
import { Button } from "antd";

import { TodoPage, AdvertisementPage, UploadPage, Login, Registration } from "./Pages";

const isAuthEnabled = import.meta.env.VITE_IS_AUTH_ENABLED === "true";

export const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const publicPages = ["/login", "/registration"];

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
        <Route path="/upload" element={<UploadPage />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </>
  );
};
