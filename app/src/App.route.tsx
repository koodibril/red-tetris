import React from "react";

import { Route, Routes } from "react-router-dom";

import HomeComponent from "./Home/Home";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="*" element={<HomeComponent />}></Route>
  </Routes>
);

export default AppRoutes;
