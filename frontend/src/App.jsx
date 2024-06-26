import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/layout/Header";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import PostsByTag from "./pages/tags/PostsByTag";

const Home = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegisterPage />} path="/register" />
        <Route path="/tags/:tag" element={<PostsByTag />} />
      </Routes>
    </div>
  );
};

export default Home;
