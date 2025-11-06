import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/Home";
import JsonPage from "./pages/JsonPage";
import Base64Page from "./pages/Base64Page";
import CryptoPage from "./pages/CryptoPage";

function AppRouter() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/">🏠 Home</Link>
        <Link to="/json">📄 JSON</Link>
        <Link to="/base64">🔐 Base64</Link>
        <Link to="/crypto">🧬 Crypto</Link>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/json" element={<JsonPage />} />
          <Route path="/base64" element={<Base64Page />} />
          <Route path="/crypto" element={<CryptoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRouter;
