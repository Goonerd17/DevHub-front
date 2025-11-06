import React, { useState } from "react";
import "../styles/common.css";
import PageLayout from "./PageLayout";

const Base64 = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <PageLayout>
      <div className="tool-container base64-page">
        <h2 className="tool-title">🔐 Base64 Encoder / Decoder</h2>
        <textarea
          placeholder="Enter text..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="button-group">
          <button onClick={() => setOutput(btoa(input))}>Encode</button>
          <button onClick={() => setOutput(atob(input))}>Decode</button>
          <button onClick={() => setInput("")}>Clear</button>
        </div>
        <textarea readOnly value={output} placeholder="Result..." />
      </div>
    </PageLayout>

  );
};

export default Base64;
