import React, { useEffect, useState } from "react";
import axios from "axios"; // ← 추가
import "../styles/common.css";
import PageLayout from "./PageLayout";

const GuestBookPage = () => {
  const [guestBooks, setGuestBooks] = useState([]);
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = "/guestbook"

  // 방명록 조회
  const fetchGuestBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}`);
      if (res.data.success === true) {
        setGuestBooks(res.data.data || []);
      } else {
        setError(res.data.message || "Failed to fetch guest books");
      }
    } catch {
      setError("Try again later");
    } finally {
      setLoading(false);
    }
  };

  // 방명록 작성
  const createGuestBook = async () => {
    if (!username || !description) {
      setError("Name and message are required");
      return;
    }
    try {
      const res = await axios.post(`${API_BASE}/create`, {
        username,
        description,
      });

      if (res.data.success === true) {
        setUsername(res.data.username);
        setDescription(res.data.description);
        fetchGuestBooks();
      } else {
        setError(res.message || "Failed to create guest book");
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
      <div className="tool-container guestbook-page">
        <h2 className="tool-title">📖 GuestBook</h2>

        {error && <p className="error-text">{error}</p>}

        {/* 구분선 위: 방명록 리스트 */}
       <div className="guestbook-list-section">
          {loading ? (
            <p>Loading...</p>
          ) : guestBooks.length === 0 ? (
            <p className="empty-text">No entries yet.</p>
          ) : (
            guestBooks.map((entry) => (
              <div key={entry.id} className="guestbook-entry">
                <p><strong>Username:</strong> {entry.username}</p>
                <p><strong>Description:</strong> {entry.description}</p>
              </div>
            ))
          )}
        </div>
        <div className="divider" />

        {/* 구분선 아래: 입력란 */}
        <div className="guestbook-form">
          <textarea
            placeholder="Write your message here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="guestbook-textarea-center"
          />

          <div className="guestbook-bottom-row">
            <input
              type="text"
              placeholder="Your Name..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="guestbook-input-left"
            />
            <div className="button-group-inline">
              <button className="btn-green" onClick={createGuestBook}>
                Write
              </button>
              <button
                className="btn-yellow"
                onClick={() => {
                  setUsername("");
                  setDescription("");
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default GuestBookPage;