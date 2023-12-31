import { Routes, Route } from "react-router-dom";

import { TodoPage, AdvertisementPage, UploadPage, Login, Registration } from "./Pages";
import { Header } from "./shared/components/Header/Header";

export const App = () => {
  return (
    <>
      <Header />
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
