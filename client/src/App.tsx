import { TodoPage, AdvertisementPage } from "./Pages";
import { Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Authorization/Login";
import { Registration } from "./Pages/Authorization/Registration";

export const App = () => {
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
