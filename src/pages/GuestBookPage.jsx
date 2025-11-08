// GuestBookPage.jsx
import React, { useEffect, useState } from "react";
import "../styles/common.css";
import PageLayout from "./PageLayout";

const GuestBookPage = () => {
  const [guestBooks, setGuestBooks] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 방명록 조회
  const fetchGuestBooks = async () => {
    setLoading(true);
    try {
      const data = await fetch("http://localhost:8080/guestbook");
      console.log(data, "data 확인") // 필요 시 전체 URL로 변경
      if (data) {
        setGuestBooks(data.data || []); // ApiResponseVo 구조에 맞게
      } else {
        setError(data.message || "Failed to fetch guest books");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  // 방명록 작성
  const createGuestBook = async () => {
    if (!name || !message) {
      setError("Name and message are required");
      return;
    }
    setError("");
    try {
      const res = await fetch("http://localhost:8080/guestbook/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      const data = await res.json();
      if (res.ok) {
        setName("");
        setMessage("");
        fetchGuestBooks(); // 작성 후 갱신
      } else {
        setError(data.message || "Failed to create guest book");
      }
    } catch {
      setError("Network error");
    }
  };

  useEffect(() => {
    fetchGuestBooks();
  }, []);

  return (
    <PageLayout>
      <div className="tool-container crypto-page">
        <h2 className="tool-title">📖 Guest Book</h2>

        {error && <p style={{ color: "#ff4d4f", marginBottom: "1rem" }}>{error}</p>}

        {/* 작성 폼 */}
        <textarea
          placeholder="Your Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <textarea
          placeholder="Your Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="button-group">
          <button onClick={createGuestBook}>Write</button>
          <button onClick={() => { setName(""); setMessage(""); }}>Clear</button>
          <button onClick={fetchGuestBooks}>Refresh</button>
        </div>

        {/* 방명록 리스트 */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div style={{ width: "100%", marginTop: "1rem" }}>
            {guestBooks.length === 0 ? (
              <p>No entries yet.</p>
            ) : (
              guestBooks.map((entry, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "#2a2a3f",
                    padding: "1rem",
                    marginBottom: "1rem",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                >
                  <strong>{entry.name}</strong>
                  <p>{entry.message}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default GuestBookPage;