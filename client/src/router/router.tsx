import { Routes, Route } from "react-router-dom";

import Home from "../pages/home";
import Quiz from "../pages/quiz";
import { Summary } from "../pages/Summary";
import NotFound from "../pages/notfound";
import MainLayout from "../layouts/main_layout";

const Router = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="quiz" element={<Quiz />} />
      <Route path="results" element={<Summary />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default Router;
