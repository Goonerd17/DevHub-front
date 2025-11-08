import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import JsonPage from "./pages/JsonPage";
import Base64Page from "./pages/Base64Page";
import CryptoPage from "./pages/CryptoPage";
import GuestBookPage from './pages/GuestBookPage';
import "./App.css"; // ✅ 선택적 (스타일 분리 시)

const App = () => {
  return (
    <BrowserRouter>
      <nav style={{
        padding: "1rem 2rem",
        background: "#1e1e1e",
        borderBottom: "1px solid #2a2a2a",
        display: "flex",
        justifyContent: "center",
        gap: "2rem"
      }}>
        <Link to="/" style={{ color: "#f5f5f5", textDecoration: "none" }}>🏠 Home</Link>
        <Link to="/json" style={{ color: "#f5f5f5", textDecoration: "none" }}>🧾 JSON</Link>
        <Link to="/base64" style={{ color: "#f5f5f5", textDecoration: "none" }}>🔐 Base64</Link>
        <Link to="/crypto" style={{ color: "#f5f5f5", textDecoration: "none" }}>💻 Crypto</Link>
        <Link to="/guestbook" style={{ color: "#f5f5f5", textDecoration: "none" }}>📖 GuestBook</Link>
      </nav>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/json" element={<JsonPage />} />
        <Route path="/base64" element={<Base64Page />} />
        <Route path="/crypto" element={<CryptoPage />} />
        <Route path="/guestbook" element={<GuestBookPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
