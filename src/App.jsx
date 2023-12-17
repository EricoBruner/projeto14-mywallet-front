import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import TransactionsPage from "./pages/TransactionPage";
import { useEffect } from "react";

export default function AppRoutes() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/cadastro") {
      return;
    }

    if (!token) {
      return navigate("/");
    }
  }, [token, navigate]);

  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/transaction/:type" element={<TransactionsPage />} />
    </Routes>
  );
}
