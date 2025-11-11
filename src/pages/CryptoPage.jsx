import React, { useState } from "react";
import "../styles/common.css";
import PageLayout from "./PageLayout";

const Crypto = () => {
  const [text, setText] = useState("");
  const [hashed, setHashed] = useState("");

  const hashText = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    setHashed(hashHex);
  };

  return (
  <PageLayout>
    <div className="tool-container crypto-page">
      <h2 className="tool-title">🧮 SHA-256 Hasher</h2>
      <textarea
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="button-group">
        <button onClick={hashText}>Hash</button>
        <button onClick={() => setText("")}>Clear</button>
      </div>
      <textarea readOnly value={hashed} placeholder="Hashed result..." />
    </div>
  </PageLayout>

  );
};

export default Crypto;
