import { TodoPage, AdvertisementPage } from "./Pages";
import { Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AdvertisementPage />} />
      <Route path="/todo" element={<TodoPage />} />
      <Route path="/Advertisement" element={<AdvertisementPage />} />
      <Route path="*" element={<div>Not found</div>} />
    </Routes>
  );
};
